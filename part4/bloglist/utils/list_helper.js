const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	return blogs.reduce((result, blog) => result + blog.likes, 0)
}

module.exports = {
	dummy,
	totalLikes,
}
