import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector((state) => state.notification)

    //const blogs = useSelector((state) => state.blogs)
    //const users = useSelector((state) => state.users)
    //console.log('blogs - ', blogs)
    //console.log('users - ', users)

    if (notification === null) {
        return <></>
    }

    return (
        <div
            className={
                notification === 'Incorrect blog details' ? 'error' : 'success'
            }
        >
            {notification}
        </div>
    )
}

export default Notification
