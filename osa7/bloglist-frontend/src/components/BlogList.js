import React, { useRef } from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const BlogList = ({ user, blogs }) => {

  const blogFormRef = useRef()
  return (
    <div>
      <h3>create new</h3>

      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm
          user={user}
        />
      </Togglable>
      {// Järjestää blogit tykkäysten mukaan, sen jälkeen renderöi ne
      }
      <Table hover>
        <tbody>
          {blogs.sort((a, b) => b.likes - a.likes)
            .map(blog =>
              <tr key={blog.id}>
                <td>
                  <Link to={`blogs/${blog.id}`}>
                    {blog.title}
                  </Link>
                </td>
              </tr>
            )}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList