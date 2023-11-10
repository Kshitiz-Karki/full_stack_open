const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async() => Book.collection.countDocuments(),
    authorCount: async() => Author.collection.countDocuments(),
    allBooks: async(root, args) => {
      const books = await Book.find({}).populate('author')
      
      const booksAuthor = books.find(x => x.author.name === args.author)
      const booksGenre = books.find(x => x.genres.includes(args.genre))

      if(booksAuthor && booksGenre)
      {
        return books.filter(x => x.author.name === args.author && x.genres.includes(args.genre))
      }
      if(booksAuthor) return books.filter(x => x.author.name === args.author)
      if(booksGenre) return books.filter(x => x.genres.includes(args.genre))
      return books
    },
    allAuthors: async() => {
      console.log('Author.find')
      return await Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  // Author: {
  //   name: (root) => root.name,
  //   born: (root) => root.born,
  //   bookCount: async(root) => //books.filter(x => x.author === root.name).length
  //     {
  //       console.log('Book.find')
  //       const books = await Book.find({}).populate('author')
  //       return books.filter(x => x.author.name === root.name).length
  //     }
  // },
  Mutation: {
    addBook: async(root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      const books = await Book.find({}).populate('author')
      let bookCount = books.filter(x => x.author.name === args.name).length
      bookCount = bookCount ? bookCount + 1 : 1

      const author = new Author({ name: args.author, bookCount })
      let savedAuthor
      try{
        savedAuthor = await author.save()
      } catch (error) {
        console.log('error - ', error)
        throw new GraphQLError('Saving author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.author,
            error
          }
        })
      }

      const book = new Book({ ...args, author: savedAuthor._id })
      let savedBook
      try{
        savedBook = await book.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }

      const response = await Book.findById(savedBook._id).populate('author')
      pubsub.publish('BOOK_ADDED', { bookAdded: response })
      return response
      // const book = { ...args, id: uuid() }
      // books.push(book)
      // if(!authors.find(x => Object.values(x).includes(args.author)))
      // {
      //   // console.log('args.author - ', args.author )
      //   authors.push({ id: uuid(), name: args.author })
      // }
      // return book

    },
    editAuthor: async(root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError('Saving birth year failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      return author

      // const authors = await Author.find({})
      // const author = authors.find(a => a.name === args.name)
      // if (!author) {
      //   return null
      // }

      // const updatedAuthor = { ...author, born: args.setBornTo }
      // const updatedAuthor = await Author.findByIdAndUpdate(author._id, { born: args.setBornTo }, { new: true })
      // authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
      // return updatedAuthor
    },
    createUser: async (root, args) => {
    const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

    return user.save()
      .catch(error => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error
          }
        })
      })
  },
  login: async (root, args) => {
    const user = await User.findOne({ username: args.username })

    if ( !user || args.password !== 'secret' ) {
      throw new GraphQLError('wrong credentials', {
        extensions: {
          code: 'BAD_USER_INPUT'
        }
      })        
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    }

    return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
  },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
  },
}

module.exports = resolvers