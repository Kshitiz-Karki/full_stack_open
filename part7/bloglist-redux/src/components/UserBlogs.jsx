import { useMatch } from 'react-router-dom'
import BlogTitles from './BlogTitles'

const UserBlogs = ({ users }) => {
  const match = useMatch('/users/:id')

  if(!users){
    return null
  }

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