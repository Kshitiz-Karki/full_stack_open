import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Blogs = ({ createNewBlog, blogFormRef }) => {
  const blogs = useSelector(state => state.blogs)

  return (
    <>
      <Togglable buttonLabel='new blog' ref={blogFormRef} >
        <BlogForm createBlog={createNewBlog} />
      </Togglable>
      <Table striped>
        <tbody>
          {[...blogs].sort((a, b) => b.likes - a.likes)
            .map(blog =>
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
                </td>
              </tr>
            )}
        </tbody>
      </Table>
    </>
  )
}

export default Blogs