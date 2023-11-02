import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getComments, saveComment } from '../reducers/commentsReducer'

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
      <form onSubmit={addComment}>
        <input type='text' value={comment} onChange={(event) => setComment(event.target.value)} />
        <button>add comment</button>
      </form>
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