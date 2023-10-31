import { useSelector } from 'react-redux'

const Notification = ({ type }) => {
  const notification = useSelector(({ notification }) => notification)
  if (notification === null) {
    return null
  }
  return <div className={type}>{notification}</div>
}

export default Notification