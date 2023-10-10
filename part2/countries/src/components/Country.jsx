const Country = ({ name, showInfo }) => {
	return (
		<div>
			{name}{' '}
			<button onClick={() => showInfo(name.toLowerCase())}>show</button>
		</div>
	)
}

export default Country
