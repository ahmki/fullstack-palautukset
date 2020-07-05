
import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { voteNotification, hideNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()
  const sortedAnecdotes = anecdotes.sort((a, b) => {
    return b.votes - a.votes
  })
  const filteredAnecdotes = sortedAnecdotes.filter(anecdote => {
    return (anecdote.content).includes(filter)
  })

  const voteHandler = ({ id, content}) => {
    dispatch(voteAnecdote(id))
    dispatch(voteNotification(content))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
  }

  return (
    <div>
      {
      filteredAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteHandler(anecdote)}>
            vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList