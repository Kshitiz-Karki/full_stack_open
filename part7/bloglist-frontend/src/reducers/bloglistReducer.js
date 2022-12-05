import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import userService from '../services/users'

export const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        displayNotification(state, action) {
            return action.payload
        },
    },
})

export const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        appendBlog(state, action) {
            state.push(action.payload)
        },
    },
})

export const userSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        setUsers(state, action) {
            return action.payload
        },
    },
})

export const { displayNotification } = notificationSlice.actions
export const { setBlogs, appendBlog } = blogSlice.actions
export const { setUsers } = userSlice.actions

let timeoutId = null

export const setNotification = (notification, timerInSeconds) => {
    return (dispatch) => {
        dispatch(displayNotification(notification))

        if (timeoutId !== null) {
            clearTimeout(timeoutId)
        }

        timeoutId = setTimeout(() => {
            dispatch(displayNotification(null))
        }, timerInSeconds * 1000)
    }
}

export const storeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const storeUsers = () => {
    return async (dispatch) => {
        const users = await userService.getAll()
        dispatch(setUsers(users))
    }
}
