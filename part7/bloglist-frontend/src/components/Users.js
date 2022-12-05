import { useSelector } from 'react-redux'
//import { Routes, Route, Link, useMatch } from 'react-router-dom'
import { Link } from 'react-router-dom'

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
    //console.log('users - ', users)

    //const match = useMatch('/users/:id')
    //const appUser = match
    //? users.find((user) => user.id === match.params.id)
    //: null

    //console.log('match -', match)
    //console.log('match.params.id - ', match.params.id)
    //console.log('appUser - ', appUser)

    return (
        <div>
            <h2>Users</h2>
            <table>
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
            </table>
        </div>
    )
}

export default Users
