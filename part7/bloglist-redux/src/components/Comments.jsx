import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getComments, saveComment } from '../reducers/commentsReducer'
import { Form, Button } from 'react-bootstrap'

const Comment = ({ content }) => {
  return (
    <li>{content}</li>
  )
}

const Comments = ({ blogId }) => {
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getComments(blogId))
  }, [blogId, dispatch])

  const comments = useSelector(state => state.comments)

  if(!comments) return null

  const addComment = event => {
    event.preventDefault()
    dispatch(saveComment({ blogId, content: comment }))
    setComment('')
  }
  return (
    <>
      <h3>comments</h3>
      <Form onSubmit={addComment}>
        <Form.Group>
          <Form.Control
            type='text'
            value={comment}
            placeholder='comments...'
            onChange={(event) => setComment(event.target.value)}
          />
          <Button className="float-end" variant="secondary" type="submit">
            add comment
          </Button>
        </Form.Group>
      </Form>
      <ul>
        {comments.map(comment =>
          <Comment
            key={comment.id}
            content={comment.content}
          />)}
      </ul>
    </>
  )
}

export default Comments