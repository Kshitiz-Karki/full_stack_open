import Person from './Person'
import { nanoid } from 'nanoid'

const Persons = ({ persons }) => {
	return (
		<>
			{persons.map((person) => (
				<Person
					key={nanoid()}
					name={person.name}
					number={person.number}
				/>
			))}
		</>
	)
}

export default Persons
