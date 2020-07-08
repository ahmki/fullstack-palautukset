import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {

  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'LIKE':
      const id = action.data.id
      const targetAnecdote = state.find(a => a.id === id)
      const changedAnecdote = {
        ...targetAnecdote,
        votes: targetAnecdote.votes + 1
      }
      return state.map(a => a.id !== id ? a : changedAnecdote)
    case 'INITIAL_ANECDOTES':
      return action.data
    default: return state
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const likedAnecdote = await anecdoteService.createVote(anecdote)
    dispatch({
      type: 'LIKE',
      data: likedAnecdote
    })
  }
}

export const addAnecdote = (content) => {

  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INITIAL_ANECDOTES',
      data: anecdotes
    })
  }
}
export default reducer