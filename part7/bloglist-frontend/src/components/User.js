import Bloglist from './Bloglist'

const User = ({ user }) => {
    console.log('user -', user)
    if (user !== undefined) {
        return (
            <div>
                <br />
                <h2>{user.name}</h2>
                <h3>Added blogs</h3>

                <ul>
                    {user.blogs.map((blog) => (
                        <li key={blog.id}>
                            <Bloglist blog={blog.title} />
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default User
