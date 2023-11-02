import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comments'

const commentsSlice = createSlice({
  name: 'comments',
  initialState: null,
  reducers: {
    setComments(state, action) {
      return action.payload
    },
    appendComment(state, action){
      state.push(action.payload)
    }
  }
})

export const getComments = (blogId) => {
  return async dispatch => {
    const comments = await commentService.getComments(blogId)
    dispatch(setComments(comments))
  }
}

export const saveComment = commentObject => {
  return async dispatch => {
    const newComment = await commentService.create(commentObject)
    dispatch(appendComment(newComment))
  }
}

export const { setComments, appendComment } = commentsSlice.actions
export default commentsSlice.reducer