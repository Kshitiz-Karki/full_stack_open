import { useMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'

const BlogTitles = ({ title }) => {
  return (
    <tr>
      <td>{title}</td>
    </tr>
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
      <Table striped>
        <thead>
          <tr>
            <th>added blogs</th>
          </tr>
        </thead>
        <tbody>
          {user.blogs.map(blog =>
            <BlogTitles
              key={blog.id}
              title={blog.title} />)}
        </tbody>
      </Table>
    </>
  )
}

export default UserBlogs