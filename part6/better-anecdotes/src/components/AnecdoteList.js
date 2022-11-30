import { connect } from 'react-redux'
import { addVote, setNotification } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, filter, handleClick }) => {

  if (filter.some(elem => elem.content === anecdote.content)) {
    return(
      <li>
        <b>{anecdote.content}</b> <br />
        has {anecdote.votes} <button onClick={handleClick}>vote</button>
      </li>
    )
  }

  return <></>
}

const AnecdoteList = (props) => {

  const anecdotesSorted =  [...props.anecdotes].sort( (a, b) => b.votes - a.votes)
  
  return(
    <ul>
      {anecdotesSorted.map(anecdote =>
        <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            filter={props.filter}
            handleClick={() => {
              props.addVote(anecdote.id, anecdote.content)
              props.setNotification(`you voted '${anecdote.content}'`, 5)
             }}
        />
      )}
    </ul>
  )
}

const mapStateToProps = (state) => {
  return { 
    filter: state.filter,
    anecdotes: state.anecdotes
   }
}

const mapDispatchToProps = {
  addVote,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
