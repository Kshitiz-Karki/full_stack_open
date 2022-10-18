const Notification = ({message, notificationType}) => {
  
    if (message === ''){
        return <></>
    }
  
    return (
      <div className={notificationType}>
        {message}
      </div>
    )
  }
  
  export default Notification