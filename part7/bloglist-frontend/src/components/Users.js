import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UserDetails = ({ name, userId, blogsCreated }) => {
    return (
        <tr>
            <td>
                <Link to={`/users/${userId}`}>{name}</Link>
            </td>
            <td>{blogsCreated}</td>
        </tr>
    )
}

const Users = () => {
    const users = useSelector((state) => state.users)

    return (
        <div>
            <h2>Users</h2>
            <Table striped>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Blogs created</th>
                    </tr>
                    {users.map((user) => (
                        <UserDetails
                            key={user.id}
                            userId={user.id}
                            name={user.name}
                            blogsCreated={user.blogs.length}
                        />
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default Users
