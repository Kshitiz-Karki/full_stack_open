import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password,
}) => {
    const notification = useSelector((state) => state.notification)

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <h2>Log in to application</h2>
                    <div className={notification ? 'error' : ''}>
                        {notification}
                    </div>
                    username
                    <input
                        type="text"
                        value={username}
                        id="username"
                        onChange={handleUsernameChange}
                    />
                </div>

                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        id="password"
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
}

export default LoginForm
