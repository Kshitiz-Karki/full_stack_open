/* eslint-disable no-unused-vars */
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (previous, current) => {
        return current.likes > previous.likes ? current : previous
    }

    return blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
    const authors = blogs.map(x => x.author)
    const uniqueAuthors = [...new Set(authors)]
    const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0)
    const maxBlogs =  Math.max(...uniqueAuthors.map(x => countOccurrences(authors, x)))
    const authorBlogsCount = uniqueAuthors.map(x => (
        {
            author: x,
            blogs: countOccurrences(authors, x)
        }
    ))
    return authorBlogsCount.filter(x => x.blogs === maxBlogs)[0]
}

const mostLikes = (blogs) => {
    const uniqueAuthors = [...new Set(blogs.map(x => x.author))]
    const totalLikes= (author) => blogs.filter(blog => blog.author === author).reduce((sum, blog) => sum + blog.likes, 0)
    const maxLikes =  Math.max(...uniqueAuthors.map(x => totalLikes(x)))
    const authorLikesCount = uniqueAuthors.map(x => (
        {
            author: x,
            likes: totalLikes(x)
        }
    ))
    return authorLikesCount.filter(x => x.likes === maxLikes)[0]
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}