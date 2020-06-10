import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import personService from './services/persons'

/* Tehtävät 2.6 - 2.10 + 2.15 - 2.19
* Aleksi Heinimäki, aleksi.heinimaki1@gmail.com
*/

const Number = (props) => {
  return (
    <div>
      {props.person.name} {props.person.number}
      <button onClick={() => props.delete(props.person.id)}>
        delete
      </button>
    </div>
  )
}


const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.addPerson}>
        <div>
          name: 
          <input value={props.name} onChange={props.nameChange} />
        </div>
        <div>
          number:
          <input value={props.number} onChange={props.numberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Filter = (props) => {
  return (
    <div>
      <p>
        filter shown with
        <input value={props.filterInput} onChange={props.filterChange} />
      </p>
    </div>
  )
}

// Komponentti onnistuneen suorituksen ilmoitukselle
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="success">
      {message}
    </div>
  )
}

const App = () => {

  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filterName, setFilterName] = useState('')
  const [ successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const success = (msg) => {
    setSuccessMessage(msg)
    setTimeout(() => setSuccessMessage(null), 5000)
  }

  const addPerson = (e) => {
    e.preventDefault()

    if (checkDuplicate.length === 0) {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response))
          success(`${newName} added`)
          setNewName('')
          setNewNumber('')
        })
        
    }
    else {
      const message = `${newName} is already added to phonebook, replace the old one with a new one?`
      if(window.confirm(message)) {

        const duplicate = persons.find(({ name }) => name === newName)
        const changedPerson = {...duplicate, number: newNumber}

        personService
          .replaceNumber(duplicate.id, changedPerson)
          .then(returned => {
            setPersons(persons.map(person => 
              person.id !== duplicate.id ? person : returned))
            success(`${newName} 's number replaced`)
            setNewName('')
            setNewNumber('')
          })
       }
    }
  }

  const checkDuplicate = persons.filter(person => person.name === newName)

  const handleDelete = (id) => {
    if (window.confirm('Delete name?')) {
      personService
        .deleteNumber(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
          success(`Successfully deleted`)
        })
        .catch(error => {
          alert('failed to delete')
        })
    }
  }
  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)
  const handleFilterChange = (e) => setFilterName(e.target.value)

  const filteredPersons = persons.filter(person => {
    return (person.name.toLowerCase()).includes(filterName.toLowerCase())
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
      <div>
        <Filter filterInput={filterName} filterChange={handleFilterChange} />
      </div>
      <div>
        <PersonForm addPerson={addPerson}
          name={newName} nameChange={handleNameChange}
          number={newNumber} numberChange={handleNumberChange} />
      </div>
      <h2>Numbers</h2>
        {filteredPersons.map((person, i) => 
          <Number key={i} person={person} number={person} delete={handleDelete}/>
        )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

export default App