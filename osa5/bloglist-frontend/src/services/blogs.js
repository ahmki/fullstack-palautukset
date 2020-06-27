import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postBlog = (data) => {
  const config = {
    headers: { Authorization: "Bearer " + data.user.token},
  }
  
  const request = axios.post(baseUrl, {
    title: data.blogTitle,
    author: data.blogAuthor,
    url: data.blogUrl,
    user: data.user,
  }, config)

  return request.then(response => response.data)
}

export default { getAll, postBlog }