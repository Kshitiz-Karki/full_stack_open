import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState: null,
  reducers: {
    setAllUsers(state, action) {
      return action.payload
    }
  }
})

export const getAllUsers = () => {
  return async dispatch => {
    const users = await userService.getAllUsers()
    // console.log('users - ', users)
    dispatch(setAllUsers(users))
  }
}

export const { setAllUsers } = allUsersSlice.actions
export default allUsersSlice.reducer