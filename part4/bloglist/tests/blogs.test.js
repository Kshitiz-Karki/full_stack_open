const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
	const blogs = []

	const result = listHelper.dummy(blogs)
	expect(result).toBe(1)
})

const listWithOneBlog = [
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
		__v: 0,
	},
]

const emptyBlogs = []

const multipleBlogs = [
	{
		_id: '5a422a851b54a676234d17f7',
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
		__v: 0,
	},
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
		__v: 0,
	},
	{
		_id: '5a422b3a1b54a676234d17f9',
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		likes: 12,
		__v: 0,
	},
	{
		_id: '5a422b891b54a676234d17fa',
		title: 'First class tests',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
		likes: 10,
		__v: 0,
	},
	{
		_id: '5a422ba71b54a676234d17fb',
		title: 'TDD harms architecture',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
		likes: 0,
		__v: 0,
	},
	{
		_id: '5a422bc61b54a676234d17fc',
		title: 'Type wars',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
		likes: 2,
		__v: 0,
	},
]

describe('total likes', () => {
	test('when list has only one blog, equals the likes of that', () => {
		expect(listHelper.totalLikes(listWithOneBlog)).toBe(5)
	})

	test('of empty list is 0', () => {
		expect(listHelper.totalLikes(emptyBlogs)).toBe(0)
	})

	test('of a bigger list is calculated right', () => {
		expect(listHelper.totalLikes(multipleBlogs)).toBe(36)
	})
})

describe('favorite Blog', () => {
	test('when list has only one blog, equals the likes of that', () => {
		expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual({
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			likes: 5,
		})
	})

	test('of empty list is {}', () => {
		expect(listHelper.favoriteBlog(emptyBlogs)).toEqual({})
	})

	test('when list has more than one blog, equals to the blog that has the maximum number of likes', () => {
		expect(listHelper.favoriteBlog(multipleBlogs)).toEqual({
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			likes: 12,
		})
	})
})

describe('most Blogs', () => {
	test('when list has only one blog, equals to the author of the same blog', () => {
		expect(listHelper.mostBlogs(listWithOneBlog)).toEqual({
			author: 'Edsger W. Dijkstra',
			blogs: 1
		})
	})

	test('of empty list is {}', () => {
		expect(listHelper.mostBlogs(emptyBlogs)).toEqual({})
	})

	test('when list has more than one blog, equals to the author that has maximum number of blogs', () => {
		expect(listHelper.mostBlogs(multipleBlogs)).toEqual({
			author: 'Robert C. Martin',
			blogs: 3
		})
	})
})

describe('most Likes', () => {
	test('when list has only one blog, equals to the author of the same blog', () => {
		expect(listHelper.mostLikes(listWithOneBlog)).toEqual({
			author: 'Edsger W. Dijkstra',
			likes: 5
		})
	})

	test('of empty list is {}', () => {
		expect(listHelper.mostLikes(emptyBlogs)).toEqual({})
	})

	test('when list has more than one blog, equals to the author that has maximum number of likes', () => {
		expect(listHelper.mostLikes(multipleBlogs)).toEqual({
			author: 'Edsger W. Dijkstra',
			likes: 17
		})
	})
})