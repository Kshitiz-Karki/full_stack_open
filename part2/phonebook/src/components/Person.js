const Person = ({personId, name, number, deletePerson}) => {

    return (
      <> 
        {name} {number} <button onClick={() => deletePerson(personId, name)}>delete</button> <br />
      </>
    )
  }
  
  export default Person