const initialState = {
  text: '',
  display: false 
}


const notificationReducer = (state = initialState, action) => {

  console.log('test', action)
  switch(action.type) {
    case('ANECDOTE_NOTIFY'):
      return {
        text : `you added ${action.anecdote}`, 
        display: true
      }
    case('VOTE_NOTIFY'):
      return {
        text : `you voted ${action.anecdote}`, 
        display: true
      }
    case('HIDE_NOTIFICATION'):
      return initialState
    default: return state
  }
}

export const anecdoteNotification = (anecdote) => {
  return {
    type: 'ANECDOTE_NOTIFY',
    anecdote
  }
}

export const voteNotification = (anecdote) => {
  return {
    type: 'VOTE_NOTIFY',
    anecdote
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION'
  }
}
export default notificationReducer