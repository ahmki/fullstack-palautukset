import React from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { anecdoteNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const createAnecdote = (e) => {
    e.preventDefault()
    let anecdote = e.target.anecdote.value
    const content = anecdote
    anecdote = ''
    dispatch(addAnecdote(content))
    dispatch(anecdoteNotification(content))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm