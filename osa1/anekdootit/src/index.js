import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// Tehtävät 1.12 - 

const Button = (props) => {
  return (
    <div>
      <button onClick={props.function}>
        {props.text}
      </button>
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  // Asetetaan satunnainen anekdootti valituksi
  const randomAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }
  
  const voteAnecdote = () => {
    const points = [...votes]
    points[selected] += 1
    setVotes(points)
  }

  return (
    <div>
      <div>
        {props.anecdotes[selected]}
      </div>
      <div>
        <p>has {votes[selected]}</p>
      </div>
      <div>
        <Button function={voteAnecdote} text="vote" />
        <Button function={randomAnecdote} text="next anecdote" />
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        {props.anecdotes[votes.indexOf(Math.max(...votes))]}
      </div>
      <div>
        has {Math.max(...votes)} votes
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)