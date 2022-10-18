const Languages = ({languages}) => {
    let key = 0
    if (languages !== '') {
        return (
            <>
                <h3>
                    languages:
                </h3>
                <ul>
                    {languages.map(language => <li key={key += 1}>{language}</li> )}
                </ul> 
            </>
        )
    }

    return <> </>
    
  }
  
  export default Languages