import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const BlogDetails = ({ blog, addLike, deleteBlog }) => {
    if (blog !== undefined) {
        const [likes, setLikes] = useState(blog.likes)

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

        console.log('likes - ', likes)

        const navigate = useNavigate()
        const handleRemoveBlog = () => {
            if (
                window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)
            ) {
                deleteBlog(blog.id)
                navigate('/')
            }
        }

        return (
            <div>
                <h1>
                    {blog.title} - {blog.author}
                </h1>
                <a
                    href={`${blog.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {blog.url}
                </a>
                <br />
                <br />
                {likes} likes &#20;
                <button onClick={handleAddLike}>like</button> <br />
                <br />
                Added by {blog.user.name}&#20;
                <button onClick={handleRemoveBlog}>remove</button>
            </div>
        )
    }
}

export default BlogDetails
