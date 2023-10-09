import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')

	useEffect(() => {
		axios.get('http://localhost:3001/persons').then((response) => {
			setPersons(response.data)
		})
	}, [])

	const addName = (event) => {
		event.preventDefault()
		if (persons.find((person) => person.name === newName)) {
			alert(`${newName} is already added to phonebook`)
		} else {
			const name = {
				name: newName,
				number: newNumber,
			}
			setPersons(persons.concat(name))
			setNewName('')
			setNewNumber('')
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
				addName={addName}
			/>
			<h2>Numbers</h2>
			<Persons persons={filteredPersons} />
		</div>
	)
}

export default App
