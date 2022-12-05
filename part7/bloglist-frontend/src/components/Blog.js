import { Link } from 'react-router-dom'

const Blog = ({ blogId, title, author }) => {
    //const [blogVisible, setBlogVisible] = useState(false)
    /*const removeVisible = () => {
        if (blog.user.username === username) {
            return true
        }
        return false
    }*/

    //const hideWhenVisible = { display: blogVisible ? 'none' : '' }
    //const showWhenVisible = { display: blogVisible ? '' : 'none' }

    //const showRemoveButton = { display: removeVisible() ? '' : 'none' }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    return (
        <div style={blogStyle}>
            <Link to={`/blogs/${blogId}`}>
                {title} - {author}{' '}
            </Link>
        </div>
    )
}

export default Blog
