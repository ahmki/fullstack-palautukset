import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = () => {
  const users = useSelector(state => state.allUsers)

  if (!users) {
    return null
  }

  return (
    <div>
      <h1>Users</h1>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>blogs created</th>
          </tr>
          {users.map(user =>
            <tr key={user.id}>
              <td><Link to={`users/${user.id}`}>
                {user.name}
              </Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserList