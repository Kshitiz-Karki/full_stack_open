import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const User = ({ name, count, id }) => {
  return (
    <tr>
      <td>
        <Link to={`/users/${id}`}>{name}</Link>
      </td>
      <td>{count}</td>
    </tr>
  )
}

const Users = () => {
  const users = useSelector(state => state.allUsers)

  if(!users){
    return null
  }

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <User
              key={user.id}
              name={user.name}
              count={user.blogs.length}
              id={user.id} />)}
        </tbody>
      </table>
    </>
  )
}

export default Users