import { useMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Comments from './Comments'

const BlogInfo = ({ updateBlog }) => {
  const match = useMatch('/blogs/:id')
  const blogs = useSelector(state => state.blogs)

  if(!blogs.length) return null

  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  return (
    <>
      <h2>{blog.title}</h2>
      <p><a href={blog.url}>{`${blog.url}`}</a></p>
      {blog.likes} likes <button onClick={() => updateBlog(blog.id)}>like</button>
      <div>added by {blog.user.name}</div>
      <Comments blogId={blog.id} />
    </>
  )
}

export default BlogInfo