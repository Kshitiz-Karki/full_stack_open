import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog} >
        <div>
          title:
          <input
            type='text'
            value={title}
            name='Title'
            placeholder='title'
            onChange={event => setTitle(event.target.value)} />
        </div>
        <div>
          author:
          <input
            type='text'
            value={author}
            name='Author'
            placeholder='author'
            onChange={event => setAuthor(event.target.value)} />
        </div>
        <div>
          url:
          <input
            type='text'
            value={url}
            name='Url'
            placeholder='url'
            onChange={event => setUrl(event.target.value)} />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default BlogForm