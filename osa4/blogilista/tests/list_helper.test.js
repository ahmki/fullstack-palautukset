const listHelper = require('../utils/list_helper')
const supertest = require('supertest')
const blogs = require('./for_testing').blogs
const blog = require('./for_testing').oneBlog
const mongoose = require('mongoose')
const app = require('../app')

const api = supertest(app)

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

test('blogs return as json', async () => {
  await api 
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(() => {
  mongoose.connection.close()
})