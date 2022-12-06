import Togglable from './Togglable'

import BlogForm from './BlogForm'
import Blog from './Blog'

const Home = ({ blogFormRef, addBlog, blogs }) => {
    return (
        <div>
            <h2>blogs</h2>
            <div>
                <br />
                <Togglable buttonLabel="New blog" ref={blogFormRef}>
                    <BlogForm createBlog={addBlog} />
                </Togglable>
                <br />
            </div>
            {blogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blogId={blog.id}
                    title={blog.title}
                    author={blog.author}
                />
            ))}
        </div>
    )
}

export default Home
