import React from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { displayNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const createAnecdote = async (e) => {
    e.preventDefault()
    let anecdote = e.target.anecdote.value
    const content = anecdote
    anecdote = ''
    

    props.addAnecdote(content)
    props.displayNotification(`you added ${content}`, 5)
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

export default connect(
  null,
  { 
    addAnecdote, 
    displayNotification
  }
)(AnecdoteForm)