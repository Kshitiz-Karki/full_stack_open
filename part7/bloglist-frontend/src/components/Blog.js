import { useState } from 'react'

const Blog = ({ blog, addLike, username, deleteBlog }) => {
    const [blogVisible, setBlogVisible] = useState(false)
    const removeVisible = () => {
        if (blog.user.username === username) {
            return true
        }
        return false
    }

    const [likes, setLikes] = useState(blog.likes)

    const hideWhenVisible = { display: blogVisible ? 'none' : '' }
    const showWhenVisible = { display: blogVisible ? '' : 'none' }

    const showRemoveButton = { display: removeVisible() ? '' : 'none' }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    const handleAddLike = () => {
        addLike(blog.id, {
            user: blog.user.id,
            likes: likes + 1,
            author: blog.author,
            title: blog.title,
            url: blog.url,
        })
        setLikes(likes + 1)
    }

    const handleRemoveBlog = () => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
            deleteBlog(blog.id)
        }
    }

    return (
        <div style={blogStyle}>
            <div style={hideWhenVisible} className="blog">
                {blog.title} - {blog.author}{' '}
                <button id="view" onClick={() => setBlogVisible(true)}>
                    view
                </button>
            </div>

            <div style={showWhenVisible} className="url">
                {blog.title} - {blog.author}{' '}
                <button onClick={() => setBlogVisible(false)}>hide</button>{' '}
                <br />
                {blog.url} <br />
                likes {likes}{' '}
                <button id="like" onClick={handleAddLike}>
                    like
                </button>{' '}
                <br />
                {blog.user.name}
                <br />
                <div id="remove-button" style={showRemoveButton}>
                    <button onClick={handleRemoveBlog}>remove</button>
                </div>
            </div>
        </div>
    )
}

export default Blog
