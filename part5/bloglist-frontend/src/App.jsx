import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if(loggedInUser){
      const user = JSON.parse(loggedInUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('wrong username or password')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const createNewBlog = async(event) => {
    event.preventDefault()
    const savedBlog = await blogService.create({ title, author, url })
    // console.log(savedBlog)
    setBlogs([...blogs].concat(savedBlog))
    setErrorMessage(`a new blog ${savedBlog.title}! by ${savedBlog.author} added`)
    setTimeout(() => setErrorMessage(null), 5000)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  if(user === null){
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} type={'error'} />
        <form onSubmit={handleLogin}>
          <div>
            username:
            <input 
              type='text'
              value={username}
              name='Username'
              onChange={(event) => setUsername(event.target.value)} />
          </div>
          <div>
            password:
            <input 
              type='password'
              value={password}
              name='Password'
              onChange={(event) => setPassword(event.target.value)}  />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} type={'success'} />
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
      <h2>create new</h2>
      <form onSubmit={createNewBlog} >
        <div>
          title:
          <input
            type='text'
            value={title}
            name='Title'
            onChange={event => setTitle(event.target.value)} />
        </div>
        <div>
          author:
          <input
            type='text'
            value={author}
            name='Author'
            onChange={event => setAuthor(event.target.value)} />
        </div>
        <div>
          url:
          <input
            type='text'
            value={url}
            name='Url'
            onChange={event => setUrl(event.target.value)} />
        </div>
        <button type='submit'>create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App