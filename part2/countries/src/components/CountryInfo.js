import { useState, useEffect } from 'react'
import axios from 'axios'
import Languages from "./Languages"

const CountryInfo = ({name, capital, area, languages, flag}) => {
    
    let key = 0

    const [temperature, setTemperature] = useState('')
    const [wind, setWind] = useState('')
    const [icon, setIcon] = useState('')

    const apiKey = process.env.REACT_APP_API_KEY
  
    useEffect(() => {
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`)  
        .then(response => {
            setTemperature(response.data.main.temp)
            setIcon(response.data.weather[0].icon)
            setWind(response.data.wind.speed)
            })
        }, [])

    return (
        <>
            <h2>
                {name}
            </h2>
            capital {capital} <br />
            area {area}
            <Languages languages={languages} />
            <img src={flag} alt="Country flag" width="150" height="100" />
            <h3>
                Weather in {capital}
            </h3>
            temperature {temperature} Celcius <br />
            <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather icon" width="120" height="100" /> <br />
            wind {wind} m/s
        </>
    )
  }
  
  export default CountryInfo