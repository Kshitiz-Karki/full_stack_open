import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './index.css'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
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
      let errorMessage = ''
      if (error.message === 'Network Error'){
        errorMessage = 'Service unavailable'
      } else {
        errorMessage = 'wrong username or password'
      }
      setErrorMessage(errorMessage)
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const createNewBlog = async(blogObject) => {
    blogFormRef.current.toggleVisibility()
    const savedBlog = await blogService.create(blogObject)
    setBlogs([...blogs].concat(savedBlog))
    setErrorMessage(`a new blog ${savedBlog.title}! by ${savedBlog.author} added`)
    setTimeout(() => setErrorMessage(null), 5000)
  }

  const updateBlog = async(blogId, blogObject) => {
    const response = await blogService.update(blogId, blogObject)
    const updatedBlog = blogs.map(blog => blogId === blog.id ? response : blog)
    setBlogs(updatedBlog)
  }

  const deleteBlog = async(blogId, title, author) => {
    if(window.confirm(`Remove blog ${title} by ${author}`)){
      await blogService.remove(blogId)
      setBlogs(blogs.filter(blog => blog.id !== blogId))
    }
  }

  const blogFormRef = useRef()

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
      <Togglable buttonLabel='new blog' ref={blogFormRef} >
        <BlogForm createBlog={createNewBlog} />
      </Togglable>
      {blogs.sort((a, b) => a.likes - b.likes)
        .map(blog => <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          loggedInUserId={user.id}
          deleteBlog={deleteBlog} />)}
    </div>
  )
}

export default App