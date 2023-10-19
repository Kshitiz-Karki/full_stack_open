const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	return blogs.reduce((result, blog) => result + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
	return blogs.reduce(
		(prev, curr) =>
			prev && prev.likes > curr.likes
				? { title: prev.title, author: prev.author, likes: prev.likes }
				: { title: curr.title, author: curr.author, likes: curr.likes },
		{}
	)
}

const mostBlogs = (blogs) => {
	let result = {}
	let blogCountArr = []

	for (let blog of blogs){
		result[blog.author] = (result[blog.author] || 0 ) + 1
	}

	for (let key in result){
		blogCountArr.push({ author: key, blogs: result[key] })
	}

	return blogCountArr.reduce((prev, curr) =>
		prev.blogs > curr.blogs
			? { author: prev.author, blogs: prev.blogs }
			: { author: curr.author, blogs: curr.blogs }
	, {})
}

const mostLikes = (blogs) => {
	let result = {}
	let blogCountArr = []

	for (let blog of blogs){
		result[blog.author] = (result[blog.author] || 0 ) + blog.likes
	}

	for (let key in result){
		blogCountArr.push({ author: key, likes: result[key] })
	}

	return blogCountArr.reduce((prev, curr) =>
		prev.likes > curr.likes
			? { author: prev.author, likes: prev.likes }
			: { author: curr.author, likes: curr.likes }
	, {})
}

// const multipleBlogs = [
// 	{
// 		_id: '5a422a851b54a676234d17f7',
// 		title: 'React patterns',
// 		author: 'Michael Chan',
// 		url: 'https://reactpatterns.com/',
// 		likes: 7,
// 		__v: 0,
// 	},
// 	{
// 		_id: '5a422aa71b54a676234d17f8',
// 		title: 'Go To Statement Considered Harmful',
// 		author: 'Edsger W. Dijkstra',
// 		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
// 		likes: 5,
// 		__v: 0,
// 	},
// 	{
// 		_id: '5a422b3a1b54a676234d17f9',
// 		title: 'Canonical string reduction',
// 		author: 'Edsger W. Dijkstra',
// 		url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
// 		likes: 12,
// 		__v: 0,
// 	},
// 	{
// 		_id: '5a422b891b54a676234d17fa',
// 		title: 'First class tests',
// 		author: 'Robert C. Martin',
// 		url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
// 		likes: 10,
// 		__v: 0,
// 	},
// 	{
// 		_id: '5a422ba71b54a676234d17fb',
// 		title: 'TDD harms architecture',
// 		author: 'Robert C. Martin',
// 		url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
// 		likes: 0,
// 		__v: 0,
// 	},
// 	{
// 		_id: '5a422bc61b54a676234d17fc',
// 		title: 'Type wars',
// 		author: 'Robert C. Martin',
// 		url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
// 		likes: 2,
// 		__v: 0,
// 	},
// ]
// console.log(mostLikes(multipleBlogs))

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}
