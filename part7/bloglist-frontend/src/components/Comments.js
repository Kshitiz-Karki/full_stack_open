import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange,
    }
}

const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    const getAll = async () => {
        try {
            const request = await axios.get(baseUrl)
            setResources(request.data)
        } catch (error) {
            setResources([])
        }
    }

    const create = async (resource) => {
        try {
            const request = await axios.post(baseUrl, resource)
            setResources([...resources, request.data])
        } catch (error) {
            setResources([...resources])
        }
    }

    const service = {
        create,
        getAll,
    }

    return [resources, service]
}

const Comments = ({ blogId }) => {
    console.log('blogId - ', blogId)

    const comment = useField('text')

    const [comments, commentService] = useResource(
        'http://localhost:3005/comments'
    )

    useEffect(() => {
        commentService.getAll()
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        commentService.create({ content: comment.value, blogId: blogId })
    }

    console.log('comments - ', comments)

    return (
        <div>
            <h2>comments</h2>
            <form onSubmit={handleSubmit}>
                <input {...comment} />
                <button>Add comment</button>
            </form>
            <br />
            <ul>
                {comments
                    .filter((comment) => comment.blogId === blogId)
                    .map((n) => (
                        <li key={n.id}>{n.content}</li>
                    ))}
            </ul>
        </div>
    )
}

export default Comments
