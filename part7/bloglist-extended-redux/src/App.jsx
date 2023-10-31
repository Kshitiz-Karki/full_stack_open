import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import './index.css'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, createBlog, updateLikes, removeBlog } from './reducers/blogReducer'
import { login, logout, fetchUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const user = useSelector(state => state.user)
  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login(username, password))
    setUsername('')
    setPassword('')
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const createNewBlog = async(blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
    dispatch(setNotification(`a new blog ${blogObject.title}! by ${blogObject.author} added`, 5))
  }

  const updateBlog = async(blogId) => {
    dispatch(updateLikes(blogId, blogs))
  }

  const deleteBlog = async(blogId, title, author) => {
    if(window.confirm(`Remove blog ${title} by ${author}`)){
      dispatch(removeBlog(blogId, blogs))
    }
  }

  const blogFormRef = useRef()

  if(user === null){
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification type={'error'} />
        <form onSubmit={handleLogin}>
          <div>
            username:
            <input
              type='text'
              value={username}
              name='Username'
              id='username'
              onChange={(event) => setUsername(event.target.value)} />
          </div>
          <div>
            password:
            <input
              type='password'
              value={password}
              name='Password'
              id='password'
              onChange={(event) => setPassword(event.target.value)}  />
          </div>
          <button type='submit' id='login-button'>login</button>
        </form>
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification type={'success'} />
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel='new blog' ref={blogFormRef} >
        <BlogForm createBlog={createNewBlog} />
      </Togglable>
      {[...blogs].sort((a, b) => b.likes - a.likes)
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