
import '../index.css'
import React from 'react'
import PropTypes from 'prop-types'


const Notification = ({ notification }) => {

  Notification.propTypes = {
    notification: PropTypes.object
  }

  if (notification === null) {
    return null
  }

  return (
    <div className={notification.type}>
      {notification.message}
    </div>
  )
}
export default Notification