import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import ShowBooks from './ShowBooks'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState('all')

  // if (!props.show) {
  //   return null
  // }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  const genres = [...new Set(books.map(book => book.genres).flat())]
  console.log('genres - ', genres)

  const buttonSpacing = {
    marginRight: 10
  }

  return (
    <div>
      <h2>books</h2>
      in genre <b>{genre}</b>
      <ShowBooks books={books} genre={genre} />
      <div>
        {genres.map(genre =>
          <button style={buttonSpacing} key={uuidv4()} onClick={() => setGenre(genre)}>{genre}</button>
        )}
      </div>
    </div>
  )
}

export default Books
