import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { displayNotification } from '../reducers/notificationReducer'
import { useParams } from 'react-router-dom'
import { changeRemoveButtonState } from '../reducers/removeButtonReducer'

const Blog = () => {
  const blogs = useSelector(state => state.blog)
  const user = useSelector(state => state.user)
  const removeVisible = useSelector(state => state.removeButton)
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

  return (
    <div id='blog'>
      <div>
        <h1>{blog.title} {blog.author}</h1>
      </div>
      <p>{blog.url}</p>
      <p id='likes'>{blog.likes} likes</p><button id='like' onClick={addLike}>like</button>
      <p>Added by {blog.user.name}</p>
      <button id='remove' style={hideRemoveWhenVisible} onClick={blogDeleter}>remove</button>
    </div>
  )
}

export default Blog
