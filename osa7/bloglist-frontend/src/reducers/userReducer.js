import loginService from '../services/login'

const userReducer = (state = null, action) => {

  switch(action.type) {
  case('SET_USER'):
    return action.data
  default: return state
  }
}

export const setUser = (user) => {
  return dispatch => {
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}

export const setLoggedUser = ({ username, password }) => {
  return async dispatch => {

    const user = await loginService.login({ username, password })
    window.localStorage.setItem('loggedUser', JSON.stringify(user))

    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}
export default userReducer