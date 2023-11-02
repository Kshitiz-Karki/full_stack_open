const commentsRouter = require('express').Router()
const Comment = require('../models/comment')

commentsRouter.get('/', async (request, response) => {
	const blogId = request.query.blogId
	const comments = await Comment.find({ blogId })
	response.json(comments)
})

module.exports = commentsRouter