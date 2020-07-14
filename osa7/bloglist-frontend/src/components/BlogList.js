import React, { useRef } from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'

const BlogList = ({ user, blogs }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const blogFormRef = useRef()
  return (
    <div>
      <h2>create new</h2>

      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm
          user={user}
        />
      </Togglable>
      {// Järjestää blogit tykkäysten mukaan, sen jälkeen renderöi ne
      }
      {blogs.sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <li style={blogStyle} key={blog.id}>
            <Link to={`blogs/${blog.id}`}>
              {blog.title}
            </Link>
          </li>
        )}
    </div>
  )
}

export default BlogList