import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

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
      <h3>create new</h3>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            type='text'
            value={title}
            name='Title'
            placeholder='title'
            id='title'
            onChange={event => setTitle(event.target.value)}
          />
          <Form.Label>author:</Form.Label>
          <Form.Control
            type='text'
            value={author}
            name='Author'
            placeholder='author'
            id='author'
            onChange={event => setAuthor(event.target.value)}
          />
          <Form.Label>url:</Form.Label>
          <Form.Control
            type='text'
            value={url}
            name='Url'
            placeholder='url'
            id='url'
            onChange={event => setUrl(event.target.value)}
          />
          <Button variant="success" type="submit" id='create-button'>
            create
          </Button>
        </Form.Group>
      </Form>
    </>
  )
}

export default BlogForm