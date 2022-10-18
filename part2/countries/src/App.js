import { useState, useEffect } from 'react'
import axios from 'axios'
import ListCountries from './components/ListCountries'

const App = () => {
  
  const [countries, setCountries] = useState([])
  const [queryString, setQueryString] = useState('')
  const [showCountry, setShowCountry] = useState({})

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all') 
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const updateCountry = (name, capital, area, languages, flag) => {
    setShowCountry({
      name : name,
      capital : capital,
      area : area,
      languages : languages,
      flag : flag
    })
  }
 
  const handleChange = (event) => {
    setQueryString(event.target.value)
    setShowCountry({})
  }

  let key = 0
  let countryCount = countries.filter(country => (country.name.common.toLowerCase()).startsWith(queryString.toLowerCase())).length

  return (
    <>
      find countries <input value={queryString} onChange={handleChange} /> <br />
      
      {Object.keys(showCountry).length === 0 
        ? (countryCount > 10 && queryString !== ''
          ? 'Too many matches, specify another filter' 
          : countries.filter(country => (country.name.common.toLowerCase()).startsWith(queryString.toLowerCase()))
                        .map(country => <ListCountries 
                                          key={key += 1} 
                                          name={country.name.common} 
                                          capital={country.capital}
                                          area={country.area}
                                          languages={country.hasOwnProperty('languages') ? Object.values(country.languages) : ''}
                                          flag={country.flags.png}
                                          queryString={queryString} 
                                          updateCountry={updateCountry}
                                          showCountryInfo={countryCount === 1 ? true : false} />)
            
          )
        :
        Object.keys(showCountry).length !== 0 && <ListCountries 
                                                    key={key += 1} 
                                                    name={showCountry.name} 
                                                    capital={showCountry.capital} 
                                                    area={showCountry.area} 
                                                    languages={showCountry.languages} 
                                                    flag={showCountry.flag}
                                                    showCountryInfo={true} />
      }
    </>
  )
}

export default App