import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ newBlogHandler }) => {

  BlogForm.propTypes = {
    newBlogHandler: PropTypes.func.isRequired
  }

  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = (e) => {
    e.preventDefault()
    newBlogHandler({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    })
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
      <button id="create" type="submit">create</button>
    </form>
  )
}

export default BlogForm