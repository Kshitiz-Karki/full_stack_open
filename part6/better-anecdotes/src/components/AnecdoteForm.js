import { connect } from 'react-redux'
import { createAnecdote, setNotification } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if ( content !== ''){
      event.target.anecdote.value = ''
      props.createAnecdote(content)
      props.setNotification(`you created '${content}'`, 5)
    } 
  }

  return (
    <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
    </form>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  setNotification
}
  
  
export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)