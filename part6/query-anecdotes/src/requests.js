import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)

export const createAnecdote = ({ content, votes }) => {
  if(content.length < 5){
    throw new Error('too short anecdote, must have length 5 or more');
  }
  return axios.post(baseUrl, { content, votes }).then(res => res.data)
}

export const updateAnecdote = ({ id, content, votes }) => 
  axios.put(`${baseUrl}/${id}`, { id, content, votes }).then(res => res.data)