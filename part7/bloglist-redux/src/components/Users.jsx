import User from './User'

const Users = ({ users }) => {

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