
import { createStore, applyMiddleware, combineReducers } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import allUsersReducer from './reducers/allUsersReducer'
import removeButtonReducer from './reducers/removeButtonReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  blog: blogReducer,
  user: userReducer,
  allUsers: allUsersReducer,
  removeButton: removeButtonReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)


export default store