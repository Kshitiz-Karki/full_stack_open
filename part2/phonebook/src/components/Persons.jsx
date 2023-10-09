import Person from './Person'
import { nanoid } from 'nanoid'

const Persons = ({ persons, deletePerson }) => {
	return (
		<>
			{persons.map((person) => (
				<Person
					key={nanoid()}
					name={person.name}
					number={person.number}
					deletePerson={deletePerson}
					id={person.id}
				/>
			))}
		</>
	)
}

export default Persons
