
import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { displayNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  // Järjestetään anekdoottien lista äänien mukaan, jonka jälkeen
  // filtteröidään anekdootit filtterin tilan mukaan
  const sortedAnecdotes = anecdotes.sort((a, b) => {
    return b.votes - a.votes
  })
  const filteredAnecdotes = sortedAnecdotes.filter(anecdote => {
    return (anecdote.content).includes(filter)
  })

  const voteHandler = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(displayNotification((`you voted ${anecdote.content}`), 5))
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