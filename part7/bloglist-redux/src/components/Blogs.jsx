import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'
import { useSelector } from 'react-redux'

const Blogs = ({ createNewBlog, blogFormRef }) => {
  const blogs = useSelector(state => state.blogs)

  return (
    <>
      <Togglable buttonLabel='new blog' ref={blogFormRef} >
        <BlogForm createBlog={createNewBlog} />
      </Togglable>
      {[...blogs].sort((a, b) => b.likes - a.likes)
        .map(blog => <Blog
          key={blog.id}
          blog={blog} />)}
    </>
  )
}

export default Blogs