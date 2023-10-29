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
	const [showCountry, setShowCountry] = useState(false)

	useEffect(() => {
		if (country) {
			axios
				.get(
					`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`
				)
				.then((response) => setCountryDetails(response.data))
		}
	}, [country])

	useEffect(() => {
		axios
			.get('https://studies.cs.helsinki.fi/restcountries/api/all')
			.then((response) => {
				setCountries(response.data.map((data) => data.name.common))
			})
	}, [])

	const handleUserInputChange = (event) => {
		setUserInput(event.target.value)
		if (showCountry) {
			setShowCountry(false)
		}
	}

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

	if (filteredCountries().length === 1 || showCountry) {
		if (
			(country === null ||
				country !== filteredCountries()[0].toLowerCase()) &&
			!showCountry
		) {
			setCountry(filteredCountries()[0].toLowerCase())
		} else {
			return (
				<>
					{findCountries()}
					{countryDetails.name &&
					country === countryDetails.name.common.toLowerCase() ? (
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

	const showDetails = (name) => {
		setCountry(name)
		setShowCountry(true)
	}

	return (
		<>
			{findCountries()}
			{countries && userInput
				? filteredCountries().map((country) => (
						<Country
							key={nanoid()}
							name={country}
							showInfo={showDetails}
						/>
				))
				: null}
		</>
	)
}

export default App
