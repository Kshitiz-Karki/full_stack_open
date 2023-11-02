import axios from 'axios'
// const baseUrl = 'http://localhost:3001'
const baseUrl = 'http://localhost:3003/api'

const getComments = async(blogId) => {
  const response = await axios.get(`${baseUrl}/comments?blogId=${blogId}`)
  return response.data
}

const create = async (newComment) => {
  const response = await axios.post(`${baseUrl}/blogs/${newComment.blogId}/comments`, newComment)
  return response.data
}

export default { getComments, create }