const Person = ({ name, number, deletePerson, id }) => (
	<div>
		{name} {number}{' '}
		<button onClick={() => deletePerson(id, name)}>delete</button>
	</div>
)

export default Person
