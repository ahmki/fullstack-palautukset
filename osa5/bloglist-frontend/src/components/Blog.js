import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeHandler, deleteHandler, currentUser }) => {

  // Poistin likehandlerin ja deletehandlerin testien takia vaatimuksista
  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    likeHandler: PropTypes.func,
    deleteHandler: PropTypes.func
  }

  const [infoVisible, setInfoVisible] = useState(false)
  const [removeVisible, setRemoveVisible] = useState(false)

  // Tykkäysten tila ettei sivua tarvi ladata uudelleen tykkäyksen jälkeen
  const [likes, setLikes] = useState(blog.likes)

  const hideWhenVisible = { display: infoVisible ? 'none' : '' }
  const showWhenVisible = { display: infoVisible ? '' : 'none' }

  const hideRemoveWhenVisible = { display: removeVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setInfoVisible(!infoVisible)

    // kannattaisi varmaan käyttää käyttäjän id:tä, vaikka myös käyttäjänimi on
    // yksilöllinen
    if (currentUser.username === blog.user.username) {
      setRemoveVisible(true)
    }
    else {
      setRemoveVisible(false)
    }
  }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = (e) => {
    e.preventDefault()
    setLikes(likes + 1)
    likeHandler({
      id: blog.id,
      title: blog.title,
      likes: likes,
      author: blog.author,
      url: blog.url
    })
  }

  const deleteBlog = (e) => {
    e.preventDefault()
    if (window.confirm(`Remove blog ${blog.title}`)) {
      deleteHandler({
        id: blog.id,
        title: blog.title,
        likes: blog.likes,
        author: blog.author,
        url: blog.url,
        user: currentUser
      })
    }
  }

  return (
    <div id='blog' style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      <div style={hideWhenVisible}>
        <button id='view' onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className="togglableDiv">
        <button onClick={toggleVisibility}>hide</button>
        <p>{blog.url}</p>
        <p id='likes'>{likes}</p><button id='like' onClick={addLike}>like</button>
        <p>{blog.user.name}</p>
        <button id='remove' style={hideRemoveWhenVisible} onClick={deleteBlog}>remove</button>
      </div>
    </div>
  )
}

export default Blog
