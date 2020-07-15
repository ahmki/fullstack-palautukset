import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { displayNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setLoggedUser, setUser } from './reducers/userReducer'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import User from './components/User'
import UserList from './components/UserList'
import { initializeUsers } from './reducers/allUsersReducer'
import {
  Switch, Route, Link
} from 'react-router-dom'
import { Navbar, Nav, Button, Form } from 'react-bootstrap'
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
  })

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

  // Kirjautumisen kasittelija
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

  const padding = {
    paddingRight: 5
  }

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification />
      <Form onSubmit={loginHandler}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            placeholder="username"
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>password</Form.Label>
          <Form.Control
            placeholder="password"
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button variant="primary" id="login" type="submit">login</Button>
      </Form>
    </div>
  )

  const blogForm = () => (
    <div>
      <Navbar bg="light">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">users</Link>
          </Nav.Link>
        </Nav>
      </Navbar>
      <Notification />
      <p>{user.name} logged in</p>
      <Button variant="secondary" onClick={logoutHandler}>logout</Button>

      <Switch>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/blogs/:id">
          <Blog />
        </Route>
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
    <div className="container">
      {user === null ?
        loginForm() :
        blogForm()
      }
    </div>
  )
}

export default App