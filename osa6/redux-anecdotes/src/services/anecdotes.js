import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const createNew = async (content) => {
  const newAnecdote = {
    content,
    id: getId(),
    votes: 0
  }
  const res = await axios.post(baseUrl, newAnecdote)
  return res.data
}

const createVote = async (anecdote) => {
  const updatedAnecdote = {
    content: anecdote.content,
    id: anecdote.id,
    votes: anecdote.votes 
  }
  const res = await axios.put(baseUrl + '/' + anecdote.id, updatedAnecdote)
  return res.data
}

export default { getAll, createNew, createVote }