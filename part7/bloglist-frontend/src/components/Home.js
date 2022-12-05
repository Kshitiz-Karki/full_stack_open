import Togglable from './Togglable'

import BlogForm from './BlogForm'
import Blog from './Blog'

const Home = ({
    user,
    //handleLogout,
    blogFormRef,
    addBlog,
    blogs,
    addLike,
    deleteBlog,
}) => {
    return (
        <div>
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
                    blog={blog}
                    addLike={addLike}
                    username={user.username}
                    deleteBlog={deleteBlog}
                />
            ))}
        </div>
    )
}

export default Home
