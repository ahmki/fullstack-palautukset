import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog, commentOnBlog } from '../reducers/blogReducer'
import { displayNotification } from '../reducers/notificationReducer'
import { useParams } from 'react-router-dom'
import { changeRemoveButtonState } from '../reducers/removeButtonReducer'
import { Button, ListGroup } from 'react-bootstrap'

const Blog = () => {
  const blogs = useSelector(state => state.blog)
  const user = useSelector(state => state.user)
  const removeVisible = useSelector(state => state.removeButton)
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const hideRemoveWhenVisible = { display: removeVisible ? '' : 'none' }

  const id = useParams().id

  if (!user && !blogs) {
    return null
  }

  const blog = blogs.find(b => b.id === id)

  if (!blog) {
    return null
  }

  if (blog.user.username === user.username) {
    dispatch(changeRemoveButtonState(true))
  }

  const addLike = (e) => {
    e.preventDefault()
    dispatch(likeBlog({
      id: blog.id,
      title: blog.title,
      likes: blog.likes + 1,
      author: blog.author,
      url: blog.url
    }))
  }

  const blogDeleter = (e) => {
    e.preventDefault()
    if (window.confirm(`Remove blog ${blog.title}`)) {
      dispatch(deleteBlog({
        id: blog.id,
        title: blog.title,
        likes: blog.likes,
        author: blog.author,
        url: blog.url,
        user: user
      }))
      const notification = {
        message: `successfully removed ${blog.title}`,
        class: 'success'
      }
      dispatch(displayNotification(notification, 4))
    }
  }

  const addComment = (e) => {
    e.preventDefault()
    dispatch(commentOnBlog(comment, blog.id))
    setComment('')
  }

  const padding = {
    paddingTop: 5
  }
  return (
    <div id='blog'>
      <div>
        <h3>{blog.title} {blog.author}</h3>
      </div>
      <p>{blog.url}</p>
      <p id='likes'>{blog.likes} likes<Button variant="outline-info" id='like' onClick={addLike}>like</Button></p>
      <p>Added by {blog.user.name}</p>
      <Button variant="outline-danger" id='remove' style={hideRemoveWhenVisible} onClick={blogDeleter}>remove</Button>

      <h1>comments</h1>
      <form onSubmit={addComment}>
        <input
          id='comment'
          type='text'
          value={comment}
          name='Comment'
          onChange={({ target }) => setComment(target.value)}
        />
        <Button variant="outline-info" type="submit">add comment</Button>
      </form>
      <ListGroup variant="flush">
        {blog.comments.map((comm, index) => (
          <ListGroup.Item variant="light" className={padding} key={index}>
            {comm}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default Blog
