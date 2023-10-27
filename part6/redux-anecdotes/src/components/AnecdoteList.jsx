import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter){
      return state.anecdotes.filter(x => x.content.includes(state.filter))
    } else {
      // console.log('filter not present');
      return state.anecdotes
    }
  })

  const dispatch = useDispatch()

  const vote = (id) => {
    // console.log('vote', id)
    dispatch(voteAnecdote(id))
  }

  return (
    <>
      {anecdotes.sort((a, b) => b.votes - a.votes)
                .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList