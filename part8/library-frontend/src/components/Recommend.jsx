import { ME } from "../queries"
import { useQuery } from '@apollo/client'
import ShowBooks from "./ShowBooks"

const Recommend = ({ books }) => {
  const resultMe = useQuery(ME)

  if (resultMe.loading) {
    return <div>loading...</div>
  }

  const me = resultMe.data.me

  return (
    <>
      <h2>recommendations</h2>
      books in your favorite genre <b>{me.favoriteGenre}</b>
      <ShowBooks books={books} genre={me.favoriteGenre} />
    </>
  )
}

export default Recommend