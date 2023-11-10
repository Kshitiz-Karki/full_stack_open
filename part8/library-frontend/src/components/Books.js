import { useQuery } from '@apollo/client'
import { BOOKS_BY_GENRE } from '../queries'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import ShowBooks from './ShowBooks'

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const result = useQuery(BOOKS_BY_GENRE, {
    variables: { genre },
    skip: !genre,
  })

  const buttonSpacing = {
    marginRight: 10
  }

  if(genre && result.data){
    return (
      <div>
        <h2>books</h2>
        in genre <b>{genre}</b>
        <ShowBooks books={result.data.allBooks} genre={genre} />
        <div>
          {props.genres.map(genre =>
            <button style={buttonSpacing} key={uuidv4()} onClick={() => setGenre(genre)}>{genre}</button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2>select any one genre</h2>
      {props.genres.map(genre =>
        <button style={buttonSpacing} key={uuidv4()} onClick={() => setGenre(genre)}>{genre}</button>
      )}
    </div>
  )
}

export default Books