const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config();

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = process.env.MONGODB_URI
console.log('connecting')
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('connected to mongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)  
  })


app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  console.log('getting')
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)
  console.log('readytopost')
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})