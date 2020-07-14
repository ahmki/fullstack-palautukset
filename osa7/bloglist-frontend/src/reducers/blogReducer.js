import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {

  switch(action.type) {
  case('NEW_BLOG'):
    return [...state, action.data]
  case('DELETE_BLOG'): {
    const id = action.data.id
    const newState = state.filter(b => b.id !== id)
    return newState
  }
  case('LIKE'): {
    const id = action.data.id
    const targetBlog = state.find(b => b.id === id)
    const changedBlog = {
      ...targetBlog,
      likes: targetBlog.likes + 1
    }
    return state.map(b => b.id !== id ? b : changedBlog)
  }
  case('INITIAL_BLOGS'):
    return action.data
  default: return state
  }
}

export const addNewBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.postBlog(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    await blogService.putLike(blog)
    dispatch({
      type: 'LIKE',
      data: blog
    })
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    await blogService.deleteBlog(blog)
    dispatch({
      type: 'DELETE_BLOG',
      data: blog
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INITIAL_BLOGS',
      data: blogs
    })
  }
}

export default blogReducer