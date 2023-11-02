import { useMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'

const BlogTitles = ({ title }) => {
  return (
    <li>
      {title}
    </li>
  )
}

const UserBlogs = () => {
  const match = useMatch('/users/:id')
  const users = useSelector(state => state.allUsers)
  if(!users) return null

  const user = match
    ? users.find(user => user.id === match.params.id)
    : null

  return (
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog =>
          <BlogTitles
            key={blog.id}
            title={blog.title} />)}
      </ul>
    </>
  )
}

export default UserBlogs