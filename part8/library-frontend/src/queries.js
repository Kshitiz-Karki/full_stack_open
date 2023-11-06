import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query AllAuthors {
  allAuthors {
    name
    born
    bookCount
  }
}
`
export const ALL_BOOKS = gql`
  query AllBooks {
  allBooks {
    title
    author
    published
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]) {
  addBook(title: $title, author: $author, published: $published, genres: $genres) {
    author
    genres
    published
    title
  }
}
`

export const EDIT_BIRTH_YEAR = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    bookCount
    born
    name
  }
}
`