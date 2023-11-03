import { useState, useEffect, useRef } from 'react'

import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, createBlog, updateLikes } from './reducers/blogReducer'
import { login, logout, fetchUser } from './reducers/userReducer'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Users from './components/Users'
import Blogs from './components/Blogs'
import { getAllUsers } from './reducers/allUsersReducer'
import UserBlogs from './components/UserBlogs'
import BlogInfo from './components/BlogInfo'

import { Form, Button, Alert, Navbar, Nav } from 'react-bootstrap'

const App = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(getAllUsers())
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

  const blogFormRef = useRef()

  if(user === null){
    return (
      <div className="container">
        <h2>Log in to application</h2>
        {(notification &&
          <Alert variant="warning">
            {notification}
          </Alert>
        )}

        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>username:</Form.Label>
            <Form.Control
              type='text'
              value={username}
              name='Username'
              id='username'
              onChange={(event) => setUsername(event.target.value)}
            />
            <Form.Label>password:</Form.Label>
            <Form.Control
              type='password'
              value={password}
              name='Password'
              id='password'
              onChange={(event) => setPassword(event.target.value)}
            />
            <br />
            <Button variant="primary" type="submit" id='login-button'>
            login
            </Button>
          </Form.Group>
        </Form>
      </div>
    )
  }

  const padding = {
    paddingRight: 5
  }

  return (
    <div className="container">
      <Router>
        <div>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#" as="span">
                  <Link style={padding} to="/">Blogs</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link style={padding} to="/users">Users</Link>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <br />

          {(notification &&
          <Alert variant="success">
            {notification}
          </Alert>
          )}

          {user.name} logged in !
          <Button className="float-end" variant="dark" onClick={handleLogout}>logout</Button>

          <div style={{ textAlign:  'center' }}>
            <h2>Blog App</h2>
          </div>

        </div>
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserBlogs />} />
          <Route path="/" element={
            <Blogs
              createNewBlog={createNewBlog}
              blogFormRef={blogFormRef} />} />
          <Route path='/blogs/:id' element={<BlogInfo updateBlog={updateBlog} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App