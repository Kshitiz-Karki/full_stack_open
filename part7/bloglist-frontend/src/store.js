import { configureStore } from '@reduxjs/toolkit'
import {
    notificationSlice,
    blogSlice,
    userSlice,
} from './reducers/bloglistReducer'

const store = configureStore({
    reducer: {
        notification: notificationSlice.reducer,
        blogs: blogSlice.reducer,
        users: userSlice.reducer,
    },
})

export default store
