import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {

  const blogFormRef = useRef()

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')
  const [notificationType, setNotificationType] = useState('')
  const [rerenderBlogs, setRerenderBlogs] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )}, [rerenderBlogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }}, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification('wrong username or password')
      setNotificationType('error')
      setTimeout(() => {
        setNotification('')
        setNotificationType('')
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const addBlog = async(blogObject) => {
    try{
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.create(blogObject)
      setRerenderBlogs(!rerenderBlogs)
      setNotification(`a new blog ${blog.title} by ${blog.author} added`)
      setNotificationType('success')
      setTimeout(() => {
        setNotification('')
        setNotificationType('')
      }, 5000)
    }
    catch (exception) {
      setNotification('Incorrect blog details')
      setNotificationType('error')
      setTimeout(() => {
        setNotification('')
        setNotificationType('')
      }, 5000)
    }
  }

  const addLike = async(id, blogObject) => {
    await blogService.update(id, blogObject)
  }

  const deleteBlog = async(id) => {
    await blogService.remove(id)
    setRerenderBlogs(!rerenderBlogs)
  }

  blogs.sort((a, b) => {
    return a.likes - b.likes
  })

  if (user === null) {
    return (
      <div>

        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
            notification={notification}
            notificationType={notificationType}
          />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <div className={notificationType}>
        {notification}
      </div>

      {user.name} logged in
      <button onClick={handleLogout}>Log out</button>
      <div>
        <br />
        <Togglable buttonLabel="New blog" ref={blogFormRef}>
          <BlogForm
            createBlog={addBlog}
          />
        </Togglable>
      </div>

      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          addLike={addLike}
          username={user.username}
          deleteBlog={deleteBlog}
        />
      )}
    </div>
  )
}

export default App
