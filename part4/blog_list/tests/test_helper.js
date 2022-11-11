const Blog = require('../models/blog')
const User = require('../models/user')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)

const initialBlogs = async () => {
    const rootUser = await User.find({ username: 'root' })

    const blogs = [
        {
            title: 'React patterns',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/',
            likes: 7,
            user: rootUser[0].id
        },
        {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            user: rootUser[0].id
        }
    ]
    return blogs
}


const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

const logInAsRoot = async () => {
    const response = await api
        .post('/api/login')
        .send({ username: 'root', password: 'sekret' })

    return response.body.token
}

module.exports = {
    initialBlogs, blogsInDb, usersInDb, logInAsRoot
}