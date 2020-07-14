
// Reduceri blogien poistonapin nakyvyydelle
const removeButtonReducer = (state = false, action) => {
  switch(action.type) {
  case('TRUE'):
    return state = true
  case('FALSE'):
    return state = false
  default: return state
  }
}

export const changeRemoveButtonState = (changeTo) => {
  return dispatch => {
    if (changeTo === true) {
      dispatch({
        type: 'TRUE',
      })
    }
    else {
      dispatch({
        type: 'FALSE'
      })
    }
  }
}

export default removeButtonReducer