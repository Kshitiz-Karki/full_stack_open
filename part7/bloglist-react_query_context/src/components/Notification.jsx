import { useNotificationValue } from '../AppContext'

const Notification = ({ type }) => {
  const notification = useNotificationValue()
  if (notification === null) {
    return null
  }
  return <div className={type}>{notification}</div>
}

export default Notification