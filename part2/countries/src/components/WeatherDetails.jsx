import axios from 'axios'
import { useEffect, useState } from 'react'

const WeatherDetails = ({ capital }) => {
	const api_key = import.meta.env.VITE_WEATHER_API_KEY

	const [weatherDetails, setWeatherDetails] = useState(null)

	useEffect(() => {
		axios
			.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`
			)
			.then((response) => setWeatherDetails(response.data))
	}, [])

	if (!weatherDetails) return null
	return (
		<>
			<h2>Weather in {capital}</h2>
			temperature - {weatherDetails.main.temp} Celcius
			<div>
				<img
					src={`https://openweathermap.org/img/wn/${weatherDetails.weather[0].icon}@2x.png`}
				/>
			</div>
			wind {weatherDetails.wind.speed} m/s
		</>
	)
}

export default WeatherDetails
