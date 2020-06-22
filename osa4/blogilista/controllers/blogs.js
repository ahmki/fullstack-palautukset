const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const getToken = request => {
  const authorization = request.get('authorization')
  const authorizationValid = authorization.toLowerCase().startsWith('bearer ')
  if (authorization && authorizationValid) {
    return authorization.substring(7)
  }
  return null
}

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1, id: 1 })

  response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', async (request, response) => {

  const body = request.body
  const token = getToken(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({
      error: 'invalid or missing token'
    })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  if(!blog.url && !blog.title) {
    response.status(400).json({
      error: 'title and url missing'
    })
  }
  else {
    if (!blog.likes) {
      blog.likes = 0
    }
    
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog)
    await user.save()

    response.status(201).json(savedBlog)
  }
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const newBlog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }

  const updatedNote = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
  response.json(updatedNote)
})

module.exports = blogRouter