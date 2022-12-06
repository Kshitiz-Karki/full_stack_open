import { useState } from 'react'
import { Form } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = async (event) => {
        event.preventDefault()
        createBlog({
            title,
            author,
            url,
        })

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2>create new blog</h2>
            <Form onSubmit={addBlog}>
                <Form.Group>
                    <Form.Label>Title:</Form.Label>
                    <Form.Control
                        type="text"
                        value={title}
                        id="title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                    <Form.Label>Author:</Form.Label>
                    <Form.Control
                        type="text"
                        value={author}
                        id="author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />

                    <Form.Label>Url:</Form.Label>
                    <Form.Control
                        type="text"
                        value={url}
                        id="url"
                        onChange={({ target }) => setUrl(target.value)}
                    />

                    <button type="submit">create</button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default BlogForm
