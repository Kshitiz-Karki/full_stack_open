import CountryInfo from './CountryInfo'

const ListCountries = ({name, capital, area, languages, flag, queryString, updateCountry, showCountryInfo}) => {

  if (!showCountryInfo) {
    
    const handleClick = () =>  updateCountry(name, capital, area, languages, flag)
    
    if (queryString === ''){
      return <> {name} <br /> </>
    }
    else {
      return <> {name} <button type="submit" onClick={handleClick}>show</button> <br /> </>
    }

  }

  else 
    
    return (
      <> 
        <CountryInfo
            name={name}
            capital={capital}
            area={area}
            languages={languages}
            flag={flag} />
      </>
    )
}

export default ListCountries