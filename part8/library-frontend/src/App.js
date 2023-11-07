import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { Route, Link, Routes } from 'react-router-dom'
import { useMutation } from "@apollo/client"
import { LOGIN } from './queries'
import Logout from './components/Logout'
import Recommend from './components/Recommend'

const App = () => {
  const [token, setToken] = useState(null)
  const [ login, result ] = useMutation(LOGIN)
  // const [ login, result ] = useMutation(LOGIN, {
  //   onError: (error) => {
  //     setError(error.graphQLErrors[0].message)
  //   }
  // })

  useEffect(() => {
    const userToken = localStorage.getItem('user_token')
    if(userToken){
      setToken(userToken)
    }
  }, [])

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('user_token', token)
    }
  }, [result.data])

  const padding = {
    paddingRight: 5
  }

  return (
    <>
      <div>
        <Link style={padding} to="/">authors</Link>
        <Link style={padding} to="/books">books</Link>
        {token && <Link style={padding} to="/add-book">add book</Link>}
        {token && <Link style={padding} to="/recommend">recommend</Link>}
        {!token && <Link style={padding} to="/login">login</Link>}
        {token && <Link style={padding} to="/logout">logout</Link>}
      </div>
      <Routes>
        <Route path="/" element={<Authors token={token} />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add-book" element={<NewBook token={token} />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/login" element={<LoginForm login={login}/>} />
        <Route path="/logout" element={<Logout setToken={setToken} />} />                                      
      </Routes>


      {/* <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={logout}>logout</button>}
      </div> */}

      {/* <Authors show={page === 'authors'} token={token} /> */}
      {/* <Books show={page === 'books'} /> */}
      {/* <NewBook show={page === 'add'} token={token} /> */}
      {/* <LoginForm show={page === 'login'} setToken={setToken} /> */}
    </>
  )
}

export default App
