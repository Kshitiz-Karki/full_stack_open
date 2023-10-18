const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// const getTokenFrom = request => {
// 	const authorization = request.get('authorization')
// 	if (authorization && authorization.startsWith('Bearer ')) {
// 		return authorization.replace('Bearer ', '')
// 	}
// 	return null
// }

blogsRouter.get('/', async(request, response) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
	response.json(blogs)
})

blogsRouter.post('/', async(request, response) => {
	// const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token invalid' })
	}
	const newBlog = request.body
	// const user = await User.findById(newBlog.userId)
	const user = await User.findById(decodedToken.id)
	newBlog.user = user.id

	const blog = new Blog(newBlog)

	if(!blog.likes){
		blog.likes = 0
	}
	if(!blog.title || !blog.url){
		return response.status(400).end()
	}
	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()
	response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

blogsRouter.put('/:id', async(request, response) => {
	const { likes } = request.body
	const updatedNote = await Blog.findByIdAndUpdate(request.params.id, { likes }, { new: true })
	response.json(updatedNote)
})

module.exports = blogsRouter
