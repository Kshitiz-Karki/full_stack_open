const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const bcrypt = require('bcrypt')
const User = require('../models/user')


beforeEach(async () => {
    await Blog.deleteMany({})

    const blogs = await helper.initialBlogs()

    for (let blog of blogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

describe('when there is initially some blogs saved', () => {
    //Exercise 4.8 Start
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100000)

    test('there are 2 blogs', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(2)
    })
    //Exercise 4.8 End

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        const blogs = await helper.initialBlogs()
        expect(response.body).toHaveLength(blogs.length)
    })

    test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')
        const authors = response.body.map(r => r.author)
        expect(authors).toContain('Edsger W. Dijkstra')
    })

    test('a specific blog can be viewed', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToView = blogsAtStart[0]
        const resultBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
        expect(resultBlog.body).toEqual(processedBlogToView)
    })
})

describe('blog key-value related tests', () => {
    //Exercise 4.9 Start
    test('unique identifier property of the blog posts is named id', async () => {
        const blogs = await helper.blogsInDb()
        expect(blogs[0].id).toBeDefined()
    })
    //Exercise 4.9 End
})


describe('add/update/delete blogs tests', () => {
    //Exercise 4.13 Start
    test('a blog can be deleted', async () => {
        const authorization = await helper.logInAsRoot()

        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `Bearer ${authorization}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        const blogs = await helper.initialBlogs()
        expect(blogsAtEnd).toHaveLength(blogs.length - 1)

        const titles = blogsAtEnd.map(blog => blog.title)

        expect(titles).not.toContain(blogToDelete.title)
    })
    //Exercise 4.13 End

    //Exercise 4.10 Start
    test('a valid blog can be added', async () => {
        const rootUser = await User.find({ username: 'root' })
        const authorization = await helper.logInAsRoot()
        const newBlog = {
            title: 'TEST BLOG',
            author: 'KK',
            url: 'http://www.xxxxxxxxx.com',
            likes: 9,
            user: rootUser[0].id
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `Bearer ${authorization}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogs = await helper.blogsInDb()
        const initialBlogs = await helper.initialBlogs()
        expect(blogs).toHaveLength(initialBlogs.length + 1)

        const titles = blogs.map(blog => blog.title)
        expect(titles).toContain('TEST BLOG')
    })
    //Exercise 4.10 End

    //Exercise 4.11 Start
    test('if the likes property is missing from the request, it will default to the value 0', async () => {
        const rootUser = await User.find({ username: 'root' })
        const newBlog = {
            title: 'TEST BLOG',
            author: 'KK',
            url: 'http://www.xxxxxxxxx.com',
            userId: rootUser[0].id
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogs = await helper.blogsInDb()
        const initialBlogs = await helper.initialBlogs()
        expect(blogs[initialBlogs.length].likes).toEqual(0)
    })
    //Exercise 4.11 End

    //Exercise 4.12 Start
    test('if the title or url properties are missing from the request data then respond with 400 Bad Request', async () => {
        const authorization = await helper.logInAsRoot()
        const newBlog = {
            author: 'KK',
            url: 'http://www.xxxxxxxxx.com'
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${authorization}`)
            .send(newBlog)
            .expect(400)
    })
    //Exercise 4.12 End

    //Exercise 4.14 Start
    test('a valid blog can be updated', async () => {
        const blogs = await helper.blogsInDb()
        const blogToUpdate = blogs[0]

        const updatedBlog = {
            likes: 150
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAfterUpdate = await helper.blogsInDb()
        expect(blogsAfterUpdate[0].likes).toEqual(150)
    })
    //Exercise 4.14 End

})
/////////////////////////////////////////////////  USER ADMINISTRATION  ////////////////////////////////////////////////////
describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })
        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username must be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })
})

/////////////////////////////////////////////////  TOKEN AUTHENTICATION  ///////////////////////////////////////////////////////
//Exercise 4.23 Start
describe('token authentication tests', () => {
    test('adding a blog fails with the proper status code 401 Unauthorized if a token is not provided', async () => {
        const rootUser = await User.find({ username: 'root' })
        const newBlog = {
            title: 'TEST BLOG',
            author: 'KK',
            url: 'http://www.xxxxxxxxx.com',
            likes: 9,
            user: rootUser[0].id
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
    })
})
//Exercise 4.23 End

afterAll(() => {
    mongoose.connection.close()
})
