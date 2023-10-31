import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action){
      return action.payload
    },
    appendBlog(state, action){
      state.push(action.payload)
    }
  }
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = blogObject => {
  return async dispatch => {
    const newBlog = await blogService.create(blogObject)
    dispatch(appendBlog(newBlog))
  }
}

export const updateLikes = (blogId, blogs) => {
  return async dispatch => {
    const blogToUpdate = blogs.find(x => x.id === blogId)
    const response = await blogService.update(blogId, { likes: blogToUpdate.likes + 1 })
    const updatedBlog = blogs.map(blog => blogId === blog.id ? response : blog)
    dispatch(setBlogs(updatedBlog))
  }
}

export const removeBlog = (blogId, blogs) => {
  return async dispatch => {
    await blogService.remove(blogId)
    dispatch(setBlogs(blogs.filter(blog => blog.id !== blogId)))
  }
}

export const { setBlogs, appendBlog } = blogSlice.actions
export default blogSlice.reducer