import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query AllAuthors {
  allAuthors {
    name
    born
  }
}
`
export const ALL_BOOKS = gql`
  query AllBooks {
  allBooks {
    author {
      name
    }
    published
    title
    genres
  }
}
`

export const CREATE_BOOK = gql`
mutation Mutation($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(title: $title, author: $author, published: $published, genres: $genres) {
    published
    title
    author {
      name
    }
  }
}
`

export const EDIT_BIRTH_YEAR = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    born
    name
  }
}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ME = gql`
  query Me {
  me {
    favoriteGenre
    username
  }
}
`

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
   published
    title
    author {
      name
    }
    genres
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const BOOKS_BY_GENRE = gql`
  query AllBooks($genre: String) {
  allBooks(genre: $genre) {
    author {
      name
    }
    published
    title
    genres
  }
}
`