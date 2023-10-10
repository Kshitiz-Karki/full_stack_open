import { nanoid } from 'nanoid'
import '../App.css'

const CountryDetails = ({ name, capital, area, languages, flag }) => {
	return (
		<>
			<h1>{name}</h1>
			<div>capital {capital}</div>
			<div>area {area}</div>
			<h2>languages:</h2>
			<ul>
				{Object.values(languages).map((language) => (
					<li key={nanoid()}>{language}</li>
				))}
			</ul>
			<div className="flagContainer">
				<img src={flag} />
			</div>
		</>
	)
}

export default CountryDetails
