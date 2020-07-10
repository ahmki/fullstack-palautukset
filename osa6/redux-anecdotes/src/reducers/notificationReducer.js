const initialState = {
  text: '',
  display: false 
}

const notificationReducer = (state = initialState, action) => {

  console.log(action)
  switch(action.type) {
    case('NOTIFY'):
      return {
        text: action.text,
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

// export const anecdoteNotification = (anecdote, sec) => {
  // return {
    // type: 'ANECDOTE_NOTIFY',
    // anecdote
  // }
// }

// const delay = (seconds) => {
  // const ms = seconds * 1000
  // setTimeout(() => {
  //   console.log('timing out')
  // }, ms)
  // .then(() => return)
// }


const getId = () => (100000 * Math.random()).toFixed(0)

export const displayNotification = (text, sec) => {
  return dispatch => {

    // luodaan jokaiselle ilmoitukselle ID, joka tarkastetaan
    // reducerissa tilan id:ta vastaan niin, että reducer poistaa
    // ainoastaan uusimman ilmoituksen oikeassa ajassa
    const id = getId()
    dispatch({
      type: 'NOTIFY',
      id,
      text
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