import { createAnecdote } from "../reducers/anecdoteReducer"
import { useDispatch } from 'react-redux'
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {

  const dispatch = useDispatch()
  
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    // const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(content))
    dispatch(setNotification(`you created '${content}'`, 10))
    // setTimeout(() => dispatch(removeNotification()), 5000)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm