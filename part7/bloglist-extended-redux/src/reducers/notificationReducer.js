import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return null
    }
  }
})

export const setNotification = (notification, timeInSecs) => {
  return dispatch => {
    dispatch(showNotification(notification))
    setTimeout(() => dispatch(clearNotification()), timeInSecs*1000)
  }
}

export const { showNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer