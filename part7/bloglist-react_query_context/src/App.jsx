import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './index.css'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import { useNotificationDispatch, useUserDispatch, useUserValue } from './AppContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const App = () => {
  const notificationDispatch = useNotificationDispatch()
  const userDispatch = useUserDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const user = useUserValue()

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if(loggedInUser){
      const user = JSON.parse(loggedInUser)
      userDispatch({ type: 'SET', payload: user })
      blogService.setToken(user.token)
    }
  }, [userDispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      userDispatch({ type: 'SET', payload: user })
      setUsername('')
      setPassword('')
    } catch (error) {
      let errorMessage = ''
      if (error.message === 'Network Error'){
        errorMessage = 'Service unavailable'
      } else {
        errorMessage = 'wrong username or password'
      }
      notificationDispatch({ type: 'SET', payload: errorMessage })
      setTimeout(() => notificationDispatch({ type: 'CLEAR' }), 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    userDispatch({ type: 'CLEAR' })
  }

  const queryClient = useQueryClient()
  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: newBlog => {
      const blogs = queryClient.getQueryData({ queryKey: ['blogs'] })
      queryClient.setQueryData({ queryKey: ['blogs'] }, blogs.concat(newBlog))
    },
    onError: error => {
      notificationDispatch({ type: 'SET', payload: error.message })
      setInterval(() => notificationDispatch({ type: 'CLEAR' }), 5000)
    }
  })

  const createNewBlog = async(blogObject) => {
    blogFormRef.current.toggleVisibility()
    newBlogMutation.mutate(blogObject)
    notificationDispatch({ type: 'SET', payload: `a new blog ${blogObject.title}! by ${blogObject.author} added` })
    setTimeout(() => notificationDispatch({ type: 'CLEAR' }), 5000)
  }

  const updateBlogMutation = useMutation(blogService.update, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const updateBlog = async(blog) => {
    updateBlogMutation.mutate({ ...blog, likes: blog.likes+1 })
  }

  const deleteBlogMutation = useMutation(blogService.remove, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const deleteBlog = async(blogId, title, author) => {
    if(window.confirm(`Remove blog ${title} by ${author}`)){
      deleteBlogMutation.mutate(blogId)
    }
  }

  const blogFormRef = useRef()

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
    retry: 1
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <h2>anecdote service not available due to problems in server</h2>
  }

  const blogs = result.data

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
      {blogs.sort((a, b) => b.likes - a.likes)
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