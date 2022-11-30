import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

/*const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

let initialState = anecdotesAtStart.map(asObject)*/

export const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendVote(state, action)
    {
      const id = action.payload
      const voteToAdd = state.find(n => n.id === id)
      const changedVote = { 
        ...voteToAdd, 
        votes: voteToAdd.votes + 1 
      }
      const newState = state.filter(n => n.id !== id)
      /// should this function return state in sorted order and reomve sorting from AnecdoteList.js ??
      return [...newState, changedVote]
    },
    
    appendAnecdote(state, action) 
    {      
      state.push(action.payload)    
    },

    setAnecdotes(state, action) 
    {      
      return action.payload    
    }
  }
})

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {

    displayNotification(state, action)
    {
      return action.payload
    }   
  }
})

let updatedState = []
export const filterSlice = createSlice({
  name: 'filter',
  initialState: [],
  reducers: {
    updateAnecdote(state, action)
    {
      state.push(action.payload)
      updatedState = updatedState.concat(action.payload)
    },

    setFilter(state, action) 
    {      
      updatedState = updatedState.concat(action.payload)
      return action.payload    
    },

    filterAnecdote(state, action)
    {
      const newState = updatedState.filter(n => n.content.includes(action.payload))
      return newState
    }
  }
})

export const { setAnecdotes, appendAnecdote, appendVote } = anecdoteSlice.actions
export const { displayNotification } = notificationSlice.actions
export const { updateAnecdote, setFilter, filterAnecdote } = filterSlice.actions


export const initializeAnecdotes = () => {  
  return async dispatch => {    
    const anecdotes = await anecdoteService.getAll()    
    dispatch(setAnecdotes(anecdotes))
    dispatch(setFilter(anecdotes))  
  }
}

export const createAnecdote = content => {  
  return async dispatch => {    
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
    dispatch(updateAnecdote(newAnecdote))
  }
}

export const addVote = (id, content) => {  
  return async dispatch => {    
    const newVote = await anecdoteService.updateVote(id, content)  
    dispatch(appendVote(id))
  }
}

let timeoutId = null

export const setNotification = (notification, timerInSeconds) => {  
  return dispatch => {
    dispatch(displayNotification(notification))

    if (timeoutId !== null){
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch(displayNotification(null))
      }, timerInSeconds * 1000)
  }  
}