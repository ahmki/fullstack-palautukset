const listHelper = require('../utils/list_helper')
const supertest = require('supertest')
const blogs = require('./for_testing').blogs
const blog = require('./for_testing').oneBlog
const blogDbContent = require('./for_testing').blogsInDb
const mongoose = require('mongoose')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('test with one blog', () => {
    const result = listHelper.totalLikes(blog)
    expect(result).toBe(5)
  })

  test('test with multiple blogs', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })

  test('test most liked blog', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[2])
  })
})

describe('tests for blogs in db', () => {
  beforeEach(async () => {

    await Blog.deleteMany({})

    const blogObjects = blogs.map(blog => new Blog(blog))
    const blogPromises = blogObjects.map(blog => blog.save())
    await Promise.all(blogPromises)

  })
  test('blogs return as json', async () => {
    await api 
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blogs id field is correct', async () => {
    const response = await api.get('/api/blogs')
    
    const responseContent = response.body.map(blog => blog.id)
    expect(responseContent).toBeDefined()
  })

  test('adding a new valid blog', async () => {
    const newBlog = {
      title: "howtotest",
      author: "timo",
      url: "aaaaaaaaaaaaaaaaaaa.com",
      likes: 5, 
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogLength = await blogDbContent()
    expect(blogLength.length).toBe(blogs.length + 1)
  })
})


afterAll(() => {
  mongoose.connection.close()
})