const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const helper = require('./test_helper')
const Blog = require('../models/blog')



beforeEach(async () => {
	await Blog.deleteMany({})

	for (let blog of helper.initialBlogs) {
		let blogObject = new Blog(blog)
		await blogObject.save()
	}
})

describe('when there is initially some blogs saved', () => {
	test('all blogs are returned as json', async () => {
		const response = await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)

		expect(response.body).toHaveLength(helper.initialBlogs.length)
	})

	test('unique identifier property of the blog posts is named id', async() => {
		const savedBlogs = await helper.blogsInDb()
		expect(savedBlogs[0].id).toBeDefined()
	})
})

describe('addition of a new blog', () => {
	test('a valid blog can be added', async () => {
		const newBlog = {
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			likes: 12,
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
		const title = blogsAtEnd.map(n => n.title)
		expect(title).toContain(
			'Canonical string reduction'
		)
	})

	test('if the likes property is missing from the request, it will default to the value 0', async() => {
		const newBlog = {
			title: 'TDD harms architecture',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
		}

		const response = await api.post('/api/blogs').send(newBlog)
		expect(response.body.likes).toBe(0)
	})

	test('blog without title or url is not added', async () => {
		const newBlog = {
			title: 'Type wars',
			author: 'Robert C. Martin',
			likes: 2,
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(400)
	})
})

describe('addition of a new blog', () => {
	test('a blog can be deleted', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToDelete = blogsAtStart[0]

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.expect(204)

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd).toHaveLength(
			helper.initialBlogs.length - 1
		)

		const title = blogsAtEnd.map(r => r.title)

		expect(title).not.toContain(blogToDelete.title)
	})
})

describe('updation of a new blog', () => {
	test('a blog\'s likes can be updated', async () => {
		const allBlogs = await helper.blogsInDb()
		const blogToUpdate = allBlogs[0]

		const updatedBlog = await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send({ likes: 10 })

		expect(blogToUpdate.likes).not.toBe(10)
		expect(updatedBlog.body.likes).toBe(10)
	})
})

afterAll(async () => {
	await mongoose.connection.close()
})