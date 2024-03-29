import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const showWhenVisible = { display: props.notification.display ? '' : 'none'}

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  return (
    <div style={showWhenVisible}>
      <div style={style}>
        {props.notification.text}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification