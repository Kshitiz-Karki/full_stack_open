import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
	query {
		allAuthors {
			name
			born
			bookCount
		}
	}
`

export const ALL_BOOKS = gql`
	query {
		allBooks {
			title
			author
			published
		}
	}
`

export const CREATE_BOOK = gql`
	mutation createBook(
		$title: String!
		$author: String
		$publishedYear: Int!
		$genres: [String]!
	) {
		addBook(
			title: $title
			author: $author
			published: $publishedYear
			genres: $genres
		) {
			title
			author
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
