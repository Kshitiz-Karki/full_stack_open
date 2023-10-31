import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser() {
      return null
    }
  }
})

export const login = (username, password) => {
  return async dispatch => {
    try{
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }catch (error) {
      let errorMessage = ''
      if (error.message === 'Network Error'){
        errorMessage = 'Service unavailable'
      } else {
        errorMessage = 'wrong username or password'
      }
      dispatch(setNotification(errorMessage, 5))
    }
  }
}

export const logout = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedInUser')
    dispatch(clearUser(null))
  }
}

export const fetchUser = () => {
  return dispatch => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if(loggedInUser){
      const user = JSON.parse(loggedInUser)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer