import { useApolloClient } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

const Logout = ({ setToken }) => {
  const client = useApolloClient()
  const navigate = useNavigate()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    navigate('/')
  }

  return (
    <>
      <button onClick={logout}>logout</button>
    </>
  )
}

export default Logout