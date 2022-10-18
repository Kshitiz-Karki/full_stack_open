import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [notification, setNotification] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)   
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    
    if (persons.length > 0 && persons.some(person => person.name === newName)) {
      const existingPerson = persons.find(person => person.name === newName)

      if (window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)){
        const existingPersonNewNumber = {...existingPerson, number: newNumber}

        personService
          .update(existingPerson.id, existingPersonNewNumber)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : updatedPerson))
          })
          .catch(error => {
            setNotification(`Information of ${newName} has already been removed from server`)
            setTimeout(() => {
              setNotification('')
            }, 5000)
            setPersons(persons.filter(person => person.id !== existingPerson.id))
          })
      }
    }
    else{
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons[persons.length-1].id + 1
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotification(`Added ${newName}`)
          setTimeout(() => {
            setNotification('')
          }, 5000)
      })
    }
  }

  const deletePerson = (personId, personName) => {
    if (window.confirm(`Delete ${personName}?`)) {
      personService
        .remove(personId)
        .then(
          setPersons(persons.filter(person => person.id !== personId))
      )
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterName = (event) => {
    setFilterName(event.target.value)
  }
  
  return (
    <div>

      <h2>Phonebook</h2>

      <Notification message={notification} />
      
      <Filter 
        filterName={filterName} 
        handleFilterName={handleFilterName} 
      />
      
      <h3>Add a new</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Persons
        persons={persons}
        filterName={filterName}
        deletePerson={deletePerson}
      />
 
    </div>
  )
}

export default App