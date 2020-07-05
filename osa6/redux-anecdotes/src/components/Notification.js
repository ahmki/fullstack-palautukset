import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const showWhenVisible = { display: notification.display ? '' : 'none'}

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  return (
    <div style={showWhenVisible}>
      <div style={style}>
        {notification.text}
      </div>
    </div>
  )
}

export default Notification