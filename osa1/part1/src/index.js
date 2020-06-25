import React from 'react';
import ReactDOM from 'react-dom';

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name} you are {props.age} vanha</p>
    </div>
  )
}

const App = () => {
  const nimi = "pekka"
  const ika = 12
        
  return (
    <div>
      <p> HELLO WORLD2</p>
      <Hello name="timo" age={11 + 12}/>
      <Hello name={nimi} age={ika}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
