import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Table } from 'react-bootstrap'

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
      <h2>{user.name}</h2>

      <h3>added blogs</h3>
      <Table bordered striped>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                {blog.title}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default User