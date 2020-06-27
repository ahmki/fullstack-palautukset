import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

/* Tehtävät 5.1 - .3
* Aleksi Heinimäki, aleksi.heinimaki1@gmail.com
*/

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  
  // Kirjautumisen hookit
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Blogin lisäämisen hookit
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

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
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  const newBlogHandler = async (e) => {
    e.preventDefault()
    console.log('saving blog', blogTitle, blogAuthor, blogUrl)

    try {
      await blogService.postBlog({ 
        blogTitle, blogAuthor, blogUrl, user
      })
      notificationSetter(`successfully added ${blogTitle}`, 'success')
      setBlogUrl('')
      setBlogTitle('')
      setBlogAuthor('')
    }

    catch(exception) {
      notificationSetter('error adding a new blog', 'error')
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
      <form onSubmit={newBlogHandler}>
        <div>
          title:
            <input
            type="text"
            value={blogTitle}
            name="Title"
            onChange={({ target }) => setBlogTitle(target.value)}
            />
        </div>
        <div>
          author:
            <input
            type="text"
            value={blogAuthor}
            name="Title"
            onChange={({ target }) => setBlogAuthor(target.value)}
            />
        </div>
        <div>
          url:
            <input
            type="text"
            value={blogUrl}
            name="Title"
            onChange={({ target }) => setBlogUrl(target.value)}
            />
        </div>
        <button type="submit">create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
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