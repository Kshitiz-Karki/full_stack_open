import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'
import { nanoid } from 'nanoid'
import FindCountries from './components/FindCountries'
import CountryDetails from './components/CountryDetails'

const App = () => {
	const [userInput, setUserInput] = useState('')
	const [countries, setCountries] = useState(null)
	const [country, setCountry] = useState(null)
	const [countryDetails, setCountryDetails] = useState({})

	useEffect(() => {
		if (country) {
			axios
				.get(
					`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`
				)
				.then((response) => {
					setCountryDetails(response.data)
				})
		}
	}, [country])

	useEffect(() => {
		axios
			.get('https://studies.cs.helsinki.fi/restcountries/api/all')
			.then((response) => {
				setCountries(response.data.map((data) => data.name.common))
			})
	}, [])

	const handleUserInputChange = (event) => setUserInput(event.target.value)

	const filteredCountries = () =>
		countries
			? countries.filter((country) =>
					country.toLowerCase().includes(userInput.toLowerCase())
			  )
			: []

	const findCountries = () => (
		<FindCountries
			value={userInput}
			onInputChange={handleUserInputChange}
		/>
	)

	if (filteredCountries().length > 10 && userInput) {
		return (
			<>
				{findCountries()}
				Too many matches, specify another filter
			</>
		)
	}

	if (filteredCountries().length === 1) {
		if (country === null) {
			setCountry(filteredCountries()[0].toLowerCase())
		} else {
			return (
				<>
					{findCountries()}
					{countryDetails.name ? (
						<CountryDetails
							name={countryDetails.name.common}
							capital={countryDetails.capital}
							area={countryDetails.area}
							languages={countryDetails.languages}
							flag={countryDetails.flags.png}
						/>
					) : null}
				</>
			)
		}
	}

	return (
		<>
			{findCountries()}
			{countries && userInput
				? filteredCountries().map((country) => (
						<Country
							key={nanoid()}
							name={country}
						/>
				  ))
				: null}
		</>
	)
}

export default App
