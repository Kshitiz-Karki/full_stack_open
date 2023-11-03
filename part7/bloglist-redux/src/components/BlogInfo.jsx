import { useMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Comments from './Comments'
import { Button } from 'react-bootstrap'

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
      {blog.likes} likes <br />
      <Button variant="secondary" onClick={() => updateBlog(blog.id)}>like</Button>
      <div>added by {blog.user.name}</div>
      <Comments blogId={blog.id} />
    </>
  )
}

export default BlogInfo