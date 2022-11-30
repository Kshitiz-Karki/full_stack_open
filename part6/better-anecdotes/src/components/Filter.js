import { connect } from 'react-redux'
import { filterAnecdote } from '../reducers/anecdoteReducer'

const Filter = (props) => {
  
    const handleChange = (event) => {
      props.filterAnecdote( event.target.value)
    }
    
    const style = {
      marginBottom: 10
    }

    return (
        <div style={style}>
          filter <input onChange={handleChange} />
        </div>
    )
  }

const mapDispatchToProps = {
  filterAnecdote
}
  
  
export default connect(
  null,
  mapDispatchToProps
)(Filter)