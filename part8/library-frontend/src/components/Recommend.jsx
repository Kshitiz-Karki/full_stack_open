import { ME, ALL_BOOKS } from "../queries"
import { useQuery } from '@apollo/client'
import ShowBooks from "./ShowBooks"

const Recommend = () => {
  const resultMe = useQuery(ME)
  const resultBooks = useQuery(ALL_BOOKS)

  if (resultMe.loading || resultBooks.loading) {
    return <div>loading...</div>
  }

  const me = resultMe.data.me
  const books = resultBooks.data.allBooks

  return (
    <>
      <h2>recommendations</h2>
      books in your favorite genre <b>{me.favoriteGenre}</b>
      <ShowBooks books={books} genre={me.favoriteGenre} />
    </>
  )
}

export default Recommend