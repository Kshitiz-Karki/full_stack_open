const Filter = ({ filter, onFilterChange }) => {
	return (
		<>
			filter shown with{' '}
			<input
				value={filter}
				onChange={onFilterChange}
			/>
		</>
	)
}

export default Filter
