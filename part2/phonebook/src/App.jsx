import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')

	useEffect(() => {
		personService
			.getAll()
			.then((initialPersons) => setPersons(initialPersons))
	}, [])

	const addPerson = (event) => {
		event.preventDefault()
		if (persons.find((person) => person.name === newName)) {
			alert(`${newName} is already added to phonebook`)
		} else {
			const newPerson = {
				name: newName,
				number: newNumber,
			}
			personService.create(newPerson).then((returnedPerson) => {
				setPersons(persons.concat(returnedPerson))
				setNewName('')
				setNewNumber('')
			})
		}
	}

	const deletePerson = (id, name) => {
		if (window.confirm(`Delete ${name} ?`)) {
			personService.remove(id).then((response) => {
				setPersons(persons.filter((person) => person.id !== id))
			})
		}
	}

	const handleNameChange = (event) => setNewName(event.target.value)
	const handleNumberChange = (event) => setNewNumber(event.target.value)
	const handleFilterChange = (event) => setFilter(event.target.value)

	const filteredPersons = filter
		? persons.filter((person) =>
				person.name.toLowerCase().includes(filter.toLowerCase())
		  )
		: persons

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter
				filter={filter}
				onFilterChange={handleFilterChange}
			/>
			<h2>add a new</h2>
			<PersonForm
				name={newName}
				number={newNumber}
				onNameChange={handleNameChange}
				onNumberChange={handleNumberChange}
				addPerson={addPerson}
			/>
			<h2>Numbers</h2>
			<Persons
				persons={filteredPersons}
				deletePerson={deletePerson}
			/>
		</div>
	)
}

export default App
