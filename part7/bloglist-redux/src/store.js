import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import allUsersReducer from './reducers/allUsersReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    user: userReducer,
    allUsers: allUsersReducer
  }
})

export default store