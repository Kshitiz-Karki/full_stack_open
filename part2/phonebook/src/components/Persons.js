import Person from "./Person"

const Persons = ({persons, filterName, deletePerson}) => {
    return (
      <> {persons.filter(person => (person.name.toLowerCase()).startsWith(filterName.toLowerCase()))
                      .map(person => <Person 
                                        key={person.id} 
                                        personId={person.id} 
                                        name={person.name} 
                                        number={person.number} 
                                        deletePerson={deletePerson} />)} 
      </>
    )
  }
  
  export default Persons