import { useState } from 'react'


const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    createBlog({
      title, author, url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <label
            htmlFor='title'>
            title:
          </label>
          <input
            value={title}
            id='title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label
            htmlFor='author'>
            author:
          </label>
          <input
            value={author}
            id='author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label
            htmlFor='url'>
            url:
          </label>
          <input
            value={url}
            id='url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm