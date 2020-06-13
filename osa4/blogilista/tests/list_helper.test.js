const listHelper = require('../utils/list_helper')
const supertest = require('supertest')
const blogs = require('./for_testing').blogs
const blog = require('./for_testing').oneBlog
const blogDbContent = require('./for_testing').blogsInDb
const mongoose = require('mongoose')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

/*
* Tehtävät 4.3 - 4.5 + 4.8 - 4.13
*/


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
  // Poistetaan vanha tietokanta ja luodaan uusi ennen jokaista tietokannan testiä
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

  test('adding a blog with no likes', async () => {
    const newBlog = {
      title: "howtotest things",
      author: "esa",
      url: "aaaaaaaaraaaaaa.com",
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const allBlogs = await blogDbContent()
    const indexOfLatest = allBlogs.length - 1
    expect(allBlogs[indexOfLatest].likes).toBe(0)
  })

  test('adding a blog with no title and url', async () => {
    const newBlog = {
      author: "esa",
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('deleting a blog', async () => {
    await api
      .delete('/api/blogs/5a422a851b54a676234d17f7')
      .expect(204)
    
  }) 

  test('modifying an existing blog', async () => {
    const updatedBlog = {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 8
    }

    await api
      .put('/api/blogs/5a422a851b54a676234d17f7')
      .send(updatedBlog)
      .expect('Content-Type', /application\/json/)
  })
})


afterAll(() => {
  mongoose.connection.close()
})