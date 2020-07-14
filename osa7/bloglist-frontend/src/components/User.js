import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const users = useSelector(state => state.allUsers)

  const id = useParams().id
  if (!users) {
    return null
  }

  const user = users.find(u => u.id === id)

  if (!user) {
    return null
  }
  const blogs = user.blogs

  return (
    <div>
      <h1>{user.name}</h1>

      <h2>added blogs</h2>
      {blogs.map((blog) => (
        <li key={blog.id}>
          {blog.title}
        </li>
      ))}
    </div>
  )
}

export default User