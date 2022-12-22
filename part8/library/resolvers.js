const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const DataLoader = require('dataloader')

const JWT_SECRET = 'Tf*6JGM6gj*3BL'

const bookCountByAuthorId = async (ids) => {
	const bookCount = ids.map((authorId) => {
		return Book.find({
			author: authorId,
		}).countDocuments()
	})
	//console.log('I only get fired once')
	return bookCount
}

const bookCountLoader = new DataLoader(bookCountByAuthorId)

const resolvers = {
	Query: {
		bookCount: async () => Book.collection.countDocuments(),
		authorCount: async () => Author.collection.countDocuments(),
		allBooks: async (root, args) => {
			return Book.find({})
		},
		allAuthors: async (root, args) => {
			return Author.find({})
		},
		me: (root, args, context) => {
			return context.currentUser
		},
		findBook: async (root, args) => {
			if (args.genre !== 'all') {
				return Book.find({
					genres: {
						$in: [args.genre],
					},
				})
			}
			return Book.find({})
		},
	},

	Book: {
		title: (root) => root.title,
		author: async (root, args) => {
			const authorId = root.author.toString()
			if (authorId) {
				const author = await Author.findOne({ _id: authorId })
				return author
			}
			return null
		},
		published: (root) => root.published,
		genres: (root) => root.genres,
	},

	Author: {
		name: (root) => root.name,
		bookCount: async (root) => bookCountLoader.load(root._id.toString()),
	},

	Mutation: {
		addBook: async (root, args, context) => {
			const currentUser = context.currentUser
			if (!currentUser) {
				throw new AuthenticationError('not authenticated')
			}

			let newAuthor = ''
			let authorObjectId = ''
			const authorObject = await Author.findOne({ name: args.author })

			if (authorObject) {
				authorObjectId = authorObject._id.toString()
			} else {
				newAuthor = new Author({ name: args.author, born: null })

				try {
					await newAuthor.save()
				} catch (error) {
					throw new UserInputError(error.message, {
						invalidArgs: args,
					})
				}
			}

			const book = new Book({
				title: args.title,
				published: args.published,
				genres: args.genres,
				author:
					authorObjectId !== ''
						? mongoose.Types.ObjectId(authorObjectId)
						: newAuthor,
			})

			try {
				await book.save()
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				})
			}

			pubsub.publish('BOOK_ADDED', { bookAdded: book })

			return book
		},
		editAuthor: async (root, args, context) => {
			const currentUser = context.currentUser
			if (!currentUser) {
				throw new AuthenticationError('not authenticated')
			}

			const author = await Author.findOne({ name: args.name })
			author.born = args.setBornTo

			try {
				await author.save()
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				})
			}
			return author
		},
		createUser: async (root, args) => {
			const user = new User({
				username: args.username,
				favouriteGenre: args.favouriteGenre,
			})

			return user.save().catch((error) => {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				})
			})
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username })

			if (!user || args.password !== 'secret') {
				throw new UserInputError('wrong credentials')
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			}

			return { value: jwt.sign(userForToken, JWT_SECRET) }
		},
	},

	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
		},
	},
}

module.exports = resolvers
