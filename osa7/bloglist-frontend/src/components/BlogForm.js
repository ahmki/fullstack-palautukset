import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewBlog } from '../reducers/blogReducer'
import { displayNotification } from '../reducers/notificationReducer'
import { Button } from 'react-bootstrap'

const BlogForm = ({ user }) => {

  const dispatch = useDispatch()

  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = (e) => {
    e.preventDefault()
    dispatch(addNewBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
      user: user
    }))
    const notification = {
      message: `successfully added ${blogTitle}`,
      class: 'success'
    }
    dispatch(displayNotification(notification, 5))
    setBlogUrl('')
    setBlogTitle('')
    setBlogAuthor('')
  }
  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          id='title'
          type="text"
          value={blogTitle}
          name="Title"
          onChange={({ target }) => setBlogTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          id='author'
          type="text"
          value={blogAuthor}
          name="Title"
          onChange={({ target }) => setBlogAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          id='url'
          type="text"
          value={blogUrl}
          name="Title"
          onChange={({ target }) => setBlogUrl(target.value)}
        />
      </div>
      <Button variant="primary" id="create" type="submit">create</Button>
    </form>
  )
}

export default BlogForm