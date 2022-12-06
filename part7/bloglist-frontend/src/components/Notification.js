import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector((state) => state.notification)

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
