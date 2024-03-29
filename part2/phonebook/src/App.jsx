import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import './index.css'
import Notification from './components/Notification'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')
	const [successMessage, setSucessMessage] = useState(null)
	const [errorMessage, setErrorMessage] = useState(null)

	useEffect(() => {
		personService
			.getAll()
			.then((initialPersons) => setPersons(initialPersons))
	}, [errorMessage])

	const addPerson = (event) => {
		event.preventDefault()
		const personFound = persons.find((person) => person.name === newName)
		if (personFound) {
			// alert(`${newName} is already added to phonebook`)
			if (
				confirm(
					`${newName} is already added to phonebook, replace the old number with a new one?`
				)
			) {
				const personUpdated = { ...personFound, number: newNumber }
				personService
					.update(personFound.id, personUpdated)
					.then((updatedPerson) => {
						// setPersons(
						// 	persons
						// 		.filter(
						// 			(person) => person.id !== personFound.id
						// 		)
						// 		.concat(updatedPerson)
						// )
						setPersons(
							persons.map((person) => {
								if (person.id === personFound.id) {
									return {
										...person,
										number: updatedPerson.number,
									}
								} else {
									return person
								}
							})
						)
					})
					.catch((err) => {
						let error = err.response.data.error
						error = error.includes('Validation failed')
							? err.response.data.error
							: `Information of ${personFound.name} has already been removed from server`
						setErrorMessage(error)
						setTimeout(() => setErrorMessage(null), 5000)
					})
			}
		} else {
			const newPerson = {
				name: newName,
				number: newNumber,
			}
			personService
				.create(newPerson)
				.then((returnedPerson) => {
					setPersons(persons.concat(returnedPerson))
					setSucessMessage(`Added: ${newName} - ${newNumber}`)
					setTimeout(() => setSucessMessage(null), 5000)
				})
				.catch((error) => {
					setErrorMessage(`${error.response.data.error}`)
					setTimeout(() => setErrorMessage(null), 5000)
				})
		}
		setNewName('')
		setNewNumber('')
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
			<Notification
				message={successMessage}
				type="success"
			/>
			<Notification
				message={errorMessage}
				type="error"
			/>
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
