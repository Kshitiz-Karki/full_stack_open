import { useState } from 'react'

const Blog = ({ blog, updateBlog, loggedInUserId, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [blogVisible, setBlogVisible] = useState(false)
  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const removeButton = () => <button onClick={() => deleteBlog(blog.id, blog.title, blog.author)}>remove</button>

  const toggleBlogVisibility = () => setBlogVisible(!blogVisible)

  return (
    <>
      <div style={hideWhenVisible} className='titleAndAuthor'>
        <div style={blogStyle}>
          <div>
            {blog.title} {blog.author}
            <button onClick={toggleBlogVisibility}>view</button>
          </div>
        </div>
      </div>
      <div style={showWhenVisible} className='allDetails'>
        <div style={blogStyle}>
          {blog.title} {blog.author}
          <button onClick={toggleBlogVisibility}>hide</button>
          <div>{blog.url}</div>
          <div>likes {blog.likes}
            <button onClick={() => updateBlog(blog.id, { likes: blog.likes+1 })}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {loggedInUserId === blog.user.id ? removeButton() : ''}
        </div>

      </div>
    </>
  )}

export default Blog