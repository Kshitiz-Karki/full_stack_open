const FindCountries = ({ value, onInputChange }) => {
	return (
		<div>
			find countries:{' '}
			<input
				value={value}
				onChange={onInputChange}
			/>
		</div>
	)
}

export default FindCountries
