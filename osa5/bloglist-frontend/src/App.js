import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

/* Tehtävät 5.1 - .10
* Aleksi Heinimäki, aleksi.heinimaki1@gmail.com
* Proptypet komponenteissa Blog, BlogForm ja Notification
*/

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)

  // Kirjautumisen hookit
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserFromLs = window.localStorage.getItem('loggedUser')
    if (loggedUserFromLs) {
      setUser(JSON.parse(loggedUserFromLs))
    }
  }, [])

  const notificationSetter = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5500)
  }

  const loginHandler = async (e) => {
    e.preventDefault()
    console.log('logging', username, password)

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      setUser(user)
      console.log(user)
      setUsername('')
      setPassword('')
    }
    catch(exception) {
      console.log('wrong credentials')
      notificationSetter('wrong username or password', 'error')
    }
  }

  const logoutHandler = () => {
    window.localStorage.removeItem('loggedUser')

    setUser(null)
    setUsername('')
    setPassword('')
  }

  const newBlogHandler = async (blogObject) => {

    console.log('saving blog', blogObject)
    blogFormRef.current.toggleVisibility()
    const newBlog = {
      title: blogObject.title,
      author: blogObject.author,
      url: blogObject.url,
      user: user
    }

    try {
      await blogService.postBlog(newBlog)
      notificationSetter(`successfully added ${newBlog.title}`, 'success')
    }

    catch(exception) {
      console.log(exception)
      notificationSetter('error adding a new blog', 'error')
    }
  }

  const likeHandler = async (blogObject) => {
    const updatedBlog = {
      id: blogObject.id,
      title: blogObject.title,
      likes: blogObject.likes,
      author: blogObject.author,
      url: blogObject.url,
      user: blogObject.user
    }

    try {
      await blogService.putLike(updatedBlog)
    }

    catch(exception) {
      console.log(exception)
    }
  }

  const deleteHandler = async (blogObject) => {
    console.log('deleting ', blogObject)

    try {
      await blogService.deleteBlog(blogObject)
    }
    catch (exception) {
      console.log(exception)
    }
  }
  const loginForm = () => (
    <div>
      <h1>log in to application</h1>
      <Notification notification={notification} />
      <form onSubmit={loginHandler}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>{user.name} logged in</p>
      <button onClick={logoutHandler}>logout</button>

      <h2>create new</h2>

      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm
          newBlogHandler={newBlogHandler}
        />
      </Togglable>
      {// Järjestää blogit tykkäysten mukaan, sen jälkeen renderöi ne
      }
      {blogs.sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog key={blog.id}
            blog={blog}
            likeHandler={likeHandler}
            deleteHandler={deleteHandler}
            currentUser={user}
          />
        )}
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