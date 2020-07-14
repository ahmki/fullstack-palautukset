
import '../index.css'
import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const showWhenVisible = { display: notification.display ? '' : 'none' }

  Notification.propTypes = {
    notification: PropTypes.object
  }

  if (notification === null) {
    return null
  }

  return (
    <div className={showWhenVisible}>
      <div className={notification.class}>
        {notification.message}
      </div>
    </div>
  )
}
export default Notification