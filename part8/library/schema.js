const { gql } = require('apollo-server')

const typeDefs = gql`
	type Book {
		title: String!
		published: Int!
		author: Author!
		genres: [String!]!
		id: ID!
	}

	type Author {
		name: String!
		born: Int
		bookCount: Int!
	}

	type User {
		username: String!
		favouriteGenre: String!
		id: ID!
	}

	type Token {
		value: String!
	}

	type Query {
		bookCount: Int!
		authorCount: Int!
		allBooks: [Book!]!
		allAuthors: [Author!]!
		me: User
		findBook(genre: String!): [Book]
	}

	type Mutation {
		addBook(
			title: String!
			author: String!
			published: Int!
			genres: [String!]!
		): Book!

		editAuthor(name: String!, setBornTo: Int!): Author

		createUser(username: String!, favouriteGenre: String!): User

		login(username: String!, password: String!): Token
	}

	type Subscription {
		bookAdded: Book!
	}
`

module.exports = typeDefs
