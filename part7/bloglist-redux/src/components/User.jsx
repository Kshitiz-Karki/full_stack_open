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

export default User