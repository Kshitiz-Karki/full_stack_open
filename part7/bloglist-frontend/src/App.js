import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
//import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
//import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import Home from './components/Home'
import BlogDetails from './components/BlogDetails'
import { Routes, Route, Link, useNavigate, useMatch } from 'react-router-dom'

import { Button } from 'react-bootstrap'

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import {
    setNotification,
    storeBlogs,
    storeUsers,
    appendBlog,
} from './reducers/bloglistReducer'

import { useDispatch } from 'react-redux'

const App = () => {
    const blogFormRef = useRef()
    const dispatch = useDispatch()

    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const [rerenderBlogs, setRerenderBlogs] = useState(false)

    useEffect(() => {
        blogService.getAll().then((blogs) => {
            setBlogs(blogs)
        })
    }, [rerenderBlogs])

    useEffect(() => {
        dispatch(storeBlogs())
        dispatch(storeUsers())
    }, [dispatch])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username,
                password,
            })

            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(user)
            )

            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            dispatch(setNotification('wrong username or password', 5))
        }
    }

    const navigate = useNavigate()
    const handleLogout = () => {
        setUser(null)
        window.localStorage.removeItem('loggedBlogappUser')

        navigate('/')
    }

    const addBlog = async (blogObject) => {
        try {
            blogFormRef.current.toggleVisibility()
            console.log('blogObject - ', blogObject)
            const blog = await blogService.create(blogObject)

            setRerenderBlogs(!rerenderBlogs)
            dispatch(
                setNotification(
                    `a new blog '${blog.title}' by ${blog.author} added`,
                    5
                )
            )
            dispatch(appendBlog(blogObject))
        } catch (exception) {
            console.log('exception - ', exception)
            dispatch(setNotification('Incorrect blog details', 5))
        }
    }

    const addLike = async (id, blogObject) => {
        await blogService.update(id, blogObject)
    }

    const deleteBlog = async (id) => {
        await blogService.remove(id)
        setRerenderBlogs(!rerenderBlogs)
    }

    blogs.sort((a, b) => {
        return b.likes - a.likes
    })

    const users = useSelector((state) => state.users)
    //const existingBlogs = useSelector((state) => state.blogs)

    const matchUser = useMatch('/users/:id')
    const appUser = matchUser
        ? users.find((user) => user.id === matchUser.params.id)
        : null
    console.log('appUser - ', appUser)

    const matchBlog = useMatch('/blogs/:id')
    const blog = matchBlog
        ? blogs.find((blog) => blog.id === matchBlog.params.id)
        : null
    console.log('blog (match) - ', blog)

    if (user === null) {
        return (
            <div className="container">
                <Togglable buttonLabel="login">
                    <LoginForm
                        username={username}
                        password={password}
                        handleUsernameChange={({ target }) =>
                            setUsername(target.value)
                        }
                        handlePasswordChange={({ target }) =>
                            setPassword(target.value)
                        }
                        handleSubmit={handleLogin}
                    />
                </Togglable>
            </div>
        )
    }

    const padding = {
        paddingRight: 5,
    }

    const colorNav = {
        backgroundColor: '#D3D3D3',
    }

    //user, handleLogout, blogFormRef, addBlog, blogs

    return (
        <div className="container">
            <Navbar
                collapseOnSelect
                expand="lg"
                style={colorNav}
                variant="dark"
            >
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#" as="span">
                            <Link style={padding} to="/">
                                Home
                            </Link>
                        </Nav.Link>

                        <Nav.Link href="#" as="span">
                            <Link style={padding} to="/users">
                                Users
                            </Link>
                        </Nav.Link>

                        <Nav.Link href="#" as="span" style={{ color: 'black' }}>
                            {user.name} logged in
                        </Nav.Link>
                        <Nav.Link href="#" as="span">
                            <Button
                                onClick={handleLogout}
                                variant="primary"
                                type="submit"
                            >
                                Log out
                            </Button>
                            {/*  <button onClick={handleLogout}>Log out</button> */}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <br />
            <h2>blogs</h2>
            <Notification />

            <Routes>
                <Route
                    path="/users/*"
                    element={
                        <Users
                        //user={user}
                        //handleLogout={handleLogout}
                        />
                    }
                />
                <Route
                    path="/"
                    element={
                        <Home
                            //user={user}
                            //handleLogout={handleLogout}
                            blogFormRef={blogFormRef}
                            addBlog={addBlog}
                            blogs={blogs}
                            //addLike={addLike}
                            //deleteBlog={deleteBlog}
                        />
                    }
                />
                <Route path="/users/:id" element={<User user={appUser} />} />

                <Route
                    path="/blogs/:id"
                    element={
                        blog ? (
                            <BlogDetails
                                blog={blog}
                                addLike={addLike}
                                deleteBlog={deleteBlog}
                            />
                        ) : null
                    }
                />
            </Routes>
        </div>
    )
}

export default App
