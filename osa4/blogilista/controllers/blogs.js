const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const cors = require('cors')

blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  if(!blog.url && !blog.title) {
    response.status(400).json({
      error: 'title and url missing'
    })
  }
  else {
    if (!blog.likes) {
      blog.likes = 0
    }

    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
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