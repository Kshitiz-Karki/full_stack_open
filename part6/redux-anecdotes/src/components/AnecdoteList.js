import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <li>
      <b>{anecdote.content}</b> <br />
      has {anecdote.votes} <button onClick={handleClick}>vote</button>
    </li>
  )
}

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state)
    anecdotes.sort( (a, b) => b.votes - a.votes)
    const dispatch = useDispatch()

  return(
    <ul>
      {anecdotes.map(anecdote =>
        <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => dispatch(addVote(anecdote.id))}
        />
      )}
    </ul>
  )
}

export default AnecdoteList
