const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

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

blogsRouter.post('/', middleware.userExtractor, async(request, response) => {
	// const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
	// const decodedToken = jwt.verify(request.token, process.env.SECRET)
	// if (!decodedToken.id) {
	// 	return response.status(401).json({ error: 'token invalid' })
	// }
	const newBlog = request.body
	const user = await User.findById(request.user)
	newBlog.user = user.id

	const blog = new Blog(newBlog)

	if(!blog.likes){
		blog.likes = 0
	}
	if(!blog.title || !blog.url){
		return response.status(400).end()
	}
	let savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()
	savedBlog = await Blog.findById(savedBlog.id).populate('user', { username: 1, name: 1 })
	response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
	const blogId = request.params.id
	const loggedInUserId = request.user
	const blog = await Blog.findById(blogId)
	if(!blog){
		return response.status(404).json({ error: 'No data found' })
	}
	if ( blog.user.toString() === loggedInUserId.toString() ){
		await Blog.findByIdAndRemove(blogId)
		response.status(204).end()
	} else {
		response.status(401).json({ error: 'Unauthorized Access' })
	}
})

blogsRouter.put('/:id', async(request, response) => {
	const { likes } = request.body
	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { likes }, { new: true }).populate('user', { username: 1, name: 1 })
	response.json(updatedBlog)

	// await Blog.findByIdAndUpdate(request.params.id, { likes }, { new: true }).populate('user', { username: 1, name: 1 })
	// const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
	// response.json(blogs)
})

module.exports = blogsRouter