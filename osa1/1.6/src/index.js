import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// Tehtävät 1.6 - 1.10

const Header = ({ header }) => {
  return (
    <div>
      <h1>{header}</h1>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.setFeedback}>
      {props.text}
    </button>
  )
}

const Statistics = (props) => {
  return (
    <div>
      <StatisticLine stat="good" value={props.value[0]} /> 
      <StatisticLine stat="neutral" value={props.value[1]} /> 
      <StatisticLine stat="bad" value={props.value[2]} /> 
      <StatisticLine stat="all" value={props.value[3]} /> 
      <StatisticLine stat="average" value={props.value[4]} /> 
      <StatisticLine stat="positive" value={props.value[5]} /> 
    </div>
  )
}

const StatisticLine = ({stat, value}) => {
  return ( 
    <div>
      <p>{stat} {value}</p>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)
  
  // Lasketaan kaikkien palautteiden summa, keskiarvo ja positiivisten prosentti
  const calculateAll = (g, b, n) => g + b + n

  const averageFeedback = (g, b, n) => {
    return ((g * 1) + (b * -1)) / (g + b + n)
  }
  const positiveFeedback = (g, b, n) => {
    return (g / (g + n + b)) * 100
  }

  // Asetetaan tarvittavat luvut taulukkoon, joka on helppo lähettää komponetille
  const statistics = [
    good,
    neutral,
    bad,
    calculateAll(good, bad, neutral),
    averageFeedback(good, bad, neutral),
    positiveFeedback(good, bad, neutral)
  ]
  
  // Ehdollinen renderöinti
  if ((good + bad + neutral) === 0) {
    return (
      <div>

        <Header header="give feedback" />

        <Button setFeedback={increaseGood} text="good" />
        <Button setFeedback={increaseNeutral} text="neutral" />
        <Button setFeedback={increaseBad} text="bad" />

        <Header header="statistics" />

        <p>No feedback given</p>
        
      </div>
    )
  }
  else {
    return (
      <div>
        <Header header="give feedback" />

        <Button setFeedback={increaseGood} text="good" />
        <Button setFeedback={increaseNeutral} text="neutral" />
        <Button setFeedback={increaseBad} text="bad" />

        <Header header="statistics" />

        <Statistics value={statistics}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)