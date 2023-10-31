import { useReducer, createContext, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'SET':
    return action.payload
  case 'CLEAR':
    return null
  default:
    return state
  }
}

const userReducer = (state, action) => {
  switch (action.type) {
  case 'SET':
    return action.payload
  case 'CLEAR':
    return null
  default:
    return state
  }
}

const AppContext = createContext()

export const AppContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)
  const [user, userDispatch] = useReducer(userReducer, null)

  return (
    <AppContext.Provider value={ [notification, notificationDispatch, user, userDispatch] }>
      {props.children}
    </AppContext.Provider>
  )
}

export const useNotificationValue = () => {
  const contexts = useContext(AppContext)
  return contexts[0]
}

export const useNotificationDispatch = () => {
  const contexts = useContext(AppContext)
  return contexts[1]
}

export const useUserValue = () => {
  const contexts = useContext(AppContext)
  return contexts[2]
}

export const useUserDispatch = () => {
  const contexts = useContext(AppContext)
  return contexts[3]
}

export default AppContext