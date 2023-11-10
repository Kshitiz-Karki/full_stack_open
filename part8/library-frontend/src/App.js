import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { Route, Link, Routes } from 'react-router-dom'
import { useMutation, useSubscription, useApolloClient, useQuery } from "@apollo/client"
import { LOGIN, BOOK_ADDED, ALL_BOOKS } from './queries'
import Logout from './components/Logout'
import Recommend from './components/Recommend'

// function that takes care of manipulating cache
export const updateBookCache = (cache, query, addedBook) => {
  const uniqueByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqueByTitle(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [token, setToken] = useState(null)
  const [ login, result ] = useMutation(LOGIN)

  const books = useQuery(ALL_BOOKS)
  const client = useApolloClient()
  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      alert(`${addedBook.title} added`)
      updateBookCache(client.cache, { query: ALL_BOOKS }, addedBook)
    }
  })

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

  if(books.loading){
    return <div>loading...</div>
  }

  const allBooks = books.data.allBooks
  const genres = [...new Set(allBooks.map(book => book.genres).flat())]

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
        <Route path="/books" element={<Books genres={genres} />} />
        <Route path="/add-book" element={<NewBook token={token} />} />
        <Route path="/recommend" element={<Recommend books={allBooks} />} />
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
