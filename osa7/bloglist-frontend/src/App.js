import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { displayNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setLoggedUser, setUser } from './reducers/userReducer'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import { initializeUsers } from './reducers/allUsersReducer'
import {
  Switch, Route
} from 'react-router-dom'
/* Tehtävät 7
* Aleksi Heinimäki, aleksi.heinimaki1@gmail.com
*
*/

const App = () => {

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blog)
  const user = useSelector(state => state.user)

  // Kirjautumisen hookit
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Kayttajien haku
  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  // Blogien haku
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  // Kirjautuneen kayttajan haku
  useEffect(() => {
    const loggedUserFromLs = window.localStorage.getItem('loggedUser')
    if (loggedUserFromLs) {
      dispatch(setUser(JSON.parse(loggedUserFromLs)))
    }
  }, [dispatch])

  const loginHandler = async (e) => {
    e.preventDefault()

    try {
      dispatch(setLoggedUser({ username, password }))

      setUsername('')
      setPassword('')
    }
    catch(exception) {
      console.log('wrong credentials')
      const notification = {
        message: 'wrong username or password',
        class: 'error'
      }
      dispatch(displayNotification(notification, 5))
    }
  }

  const logoutHandler = () => {
    window.localStorage.removeItem('loggedUser')

    dispatch(setUser(null))
    setUsername('')
    setPassword('')
  }


  const loginForm = () => (
    <div>
      <h1>log in to application</h1>
      <Notification />
      <form onSubmit={loginHandler}>
        <div>
          username
          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login" type="submit">login</button>
      </form>
    </div>
  )

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>{user.name} logged in</p>
      <button onClick={logoutHandler}>logout</button>

      <Switch>
        <Route path="/users">
          <UserList />
        </Route>
        <Route path ="/">
          <BlogList user={user} blogs={blogs} />
        </Route>
      </Switch>
    </div>
  )

  return (
    <div>
      {user === null ?
        loginForm() :
        blogForm()
      }

    </div>
  )
}

export default App