import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter){
      return state.anecdotes.filter(x => x.content.includes(state.filter))
    } else {
      return state.anecdotes
    }
  })

  const dispatch = useDispatch()

  const vote = (id, content) => {
    dispatch(voteAnecdote(id))
    dispatch(setNotification(`you voted '${content}'`))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }

  return (
    <>
      {[...anecdotes].sort((a, b) => b.votes - a.votes)
                    .map(anecdote =>
                      <div key={anecdote.id}>
                        <div>
                          {anecdote.content}
                        </div>
                        <div>
                          has {anecdote.votes}
                          <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                        </div>
                      </div>
      )}
    </>
  )
}

export default AnecdoteList