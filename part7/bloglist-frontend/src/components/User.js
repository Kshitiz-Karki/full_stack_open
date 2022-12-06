import Bloglist from './Bloglist'

const User = ({ user }) => {
    if (user !== undefined) {
        return (
            <div>
                <br />
                <h2>{user.name}</h2>
                <br />
                <h3>Added blogs</h3>
                {user.blogs.length > 0 ? (
                    <ul>
                        {user.blogs.map((blog) => (
                            <li key={blog.id}>
                                <Bloglist blog={blog.title} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <h4>
                        <i>
                            <u>No blogs present for this user</u>
                        </i>
                    </h4>
                )}
            </div>
        )
    }
}

export default User
