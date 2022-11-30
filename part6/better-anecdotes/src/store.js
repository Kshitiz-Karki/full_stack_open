import { configureStore } from '@reduxjs/toolkit'
import { anecdoteSlice, notificationSlice, filterSlice } from './reducers/anecdoteReducer'



const store = configureStore({  
    reducer: {    
        anecdotes: anecdoteSlice.reducer,
        notification: notificationSlice.reducer,
        filter: filterSlice.reducer
    }
})

export default store