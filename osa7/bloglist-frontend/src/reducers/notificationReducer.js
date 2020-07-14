const initialState = {
  text: '',
  display: false
}

// muunneltu notificationReducer redux-anecdotes tehtävästä

const notificationReducer = (state = initialState, action) => {

  switch(action.type) {
  case('NOTIFY'):
    return {
      message: action.notification.message,
      class: action.notification.class,
      id: action.id,
      display: true
    }
  case('HIDE_NOTIFICATION'):
    if (state.id === action.id) {
      return initialState
    }
    else {
      return state
    }
  default: return state
  }
}

const getId = () => (100000 * Math.random()).toFixed(0)

export const displayNotification = (notification, sec) => {
  return dispatch => {

    // luodaan jokaiselle ilmoitukselle ID, joka tarkastetaan
    // reducerissa tilan id:ta vastaan niin, että reducer poistaa
    // ainoastaan uusimman ilmoituksen oikeassa ajassa
    const id = getId()
    dispatch({
      type: 'NOTIFY',
      id,
      notification,
    })

    const ms = sec * 1000
    setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTIFICATION',
        id
      })
    }, ms)
  }
}

export default notificationReducer