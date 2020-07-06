import React from 'react'

/* Tehtävien 2.1 - 2.5 komponentit
* aleksi.heinimaki1@gmail.com
*/

// Komponentti vastaa headereiden renderöinnistä
const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

// Komponentti vastaa sisällön renderöinnistä kutsuen Part komponenttia
const Content = (props) => {
  return (
    <div>
      {props.parts.map(partName => 
        <Part key={partName.id} part={partName} />
      )}
    </div>
  )

}

// Komponentti joka vastaa rivien renderöinnistä
const Part = ({ part }) => {
  return (
    <div>
      <p>
        {part.name} {part.exercises}
      </p>
    </div>
  )
}

// Komponentti laskee ja tulostaa harjoitusten määrän
const Total = ({ exercises }) => {
  const allExercises = exercises.map(exercise => exercise.exercises)
  const exerciseAmount = 
    allExercises.reduce((sum, exercises) => exercises + sum, 0)

  return (
    <div> 
      <p><b>Total of {exerciseAmount} exercises</b></p>
    </div>
  )
}

// Komponentistä kutsutaan kaikki muut tarvittavat komponentit
const Course = ({ courses }) => {
  return (
    <div>
      <Header course={courses.name} />
      <Content parts={courses.parts} />
      <Total exercises={courses.parts} />
    </div>
  )
}

export default Course