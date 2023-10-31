import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async() => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async(blog) => {
  // console.log('id - ', id)
  console.log('newObject - ', blog)
  const response = await axios.put(`${ baseUrl }/${blog.id}`, blog)
  return response.data
}

const remove = async(id) => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(`${ baseUrl }/${id}`, config)
}

export default { setToken, getAll, create, update, remove }