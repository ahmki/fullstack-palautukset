import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postBlog = (data) => {
  const config = {
    headers: { Authorization: 'Bearer ' + data.user.token }, }

  const request = axios.post(baseUrl, {
    title: data.title,
    author: data.author,
    url: data.url,
    user: data.user,
  }, config)

  return request.then(response => response.data)
}

const putLike = blog => {

  const request = axios.put(baseUrl + '/' + blog.id, {
    title: blog.title,
    likes: blog.likes,
    author: blog.author,
    url: blog.url,
    user: blog.user
  })

  return request.then(response => response.data)
}

const deleteBlog = blog => {
  const config = {
    headers: { Authorization: 'Bearer ' + blog.user.token }, }
  const url = baseUrl + '/' + blog.id
  console.log(url, blog.user.token)
  const request = axios.delete(url, config,
    {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user,
    })

  return request.then(response => response.data)
}

export default { getAll, postBlog, putLike, deleteBlog }