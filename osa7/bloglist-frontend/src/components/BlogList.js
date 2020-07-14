import React, { useRef } from 'react'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const BlogList = ({ user, blogs }) => {

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
          <Blog key={blog.id}
            blog={blog}
            currentUser={user}
          />
        )}
    </div>
  )
}

export default BlogList