import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import './index.css'

import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, createBlog, updateLikes, removeBlog } from './reducers/blogReducer'
import { login, logout, fetchUser } from './reducers/userReducer'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Users from './components/Users'
import Blogs from './components/Blogs'
import { getAllUsers } from './reducers/allUsersReducer'
import UserBlogs from './components/UserBlogs'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.allUsers)

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

  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification type={'success'} />
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
      <Router>
        <div>
          <Link style={padding} to="/">blogs</Link>
          <Link style={padding} to="/users">users</Link>
        </div>
        <Routes>
          <Route path="/users" element={<Users users={users} />} />
          <Route path="/" element={
            <Blogs
              createNewBlog={createNewBlog}
              blogFormRef={blogFormRef}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog} />} />
          <Route path="/users/:id" element={<UserBlogs users={users} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App