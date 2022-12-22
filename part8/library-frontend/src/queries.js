import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
	fragment BookDetails on Book {
		title
		author {
			name
			born
		}
		published
		genres
	}
`

export const ALL_AUTHORS = gql`
	query {
		allAuthors {
			name
			born
		}
	}
`

export const ALL_BOOKS = gql`
	query {
		allBooks {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`

export const CREATE_BOOK = gql`
	mutation createBook(
		$title: String!
		$author: String!
		$publishedYear: Int!
		$genres: [String!]!
	) {
		addBook(
			title: $title
			author: $author
			published: $publishedYear
			genres: $genres
		) {
			title
			author {
				name
				born
			}
			published
			genres
		}
	}
`

export const UPDATE_BIRTH_YEAR = gql`
	mutation updateBirthYear($name: String!, $birthYear: Int!) {
		editAuthor(name: $name, setBornTo: $birthYear) {
			name
			born
		}
	}
`

export const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
		}
	}
`

export const ME = gql`
	query {
		me {
			username
			favouriteGenre
		}
	}
`

export const BOOKS_BY_GENRE = gql`
	query findBook($genre: String!) {
		findBook(genre: $genre) {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`

export const BOOK_ADDED = gql`
	subscription {
		bookAdded {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`
