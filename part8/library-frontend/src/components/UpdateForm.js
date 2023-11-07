import { useState } from "react"
import { EDIT_BIRTH_YEAR, ALL_AUTHORS } from "../queries"
import { useMutation } from '@apollo/client'
import Select from 'react-select'

const UpdateForm = ({ authorNames }) => {
  const options = authorNames.map(x => ({ value: x, label: x }) )
  const [name, setName] = useState(null)
  let [born, setBorn] = useState('')

  const [ updateBornYear ] = useMutation(EDIT_BIRTH_YEAR,  {
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        const author = response.data.editAuthor.name
        return {
          allAuthors: allAuthors.filter(x => x.name !== author).concat(response.data.editAuthor),
        }
      })
    },
  })

  const updateBirthYear = (event) => {  
    event.preventDefault()
    born = Number(born)
    if(name && born){
      updateBornYear({ variables: { name: name.value, setBornTo: born } })
    }
    setName(null)
    setBorn('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={updateBirthYear}>
        <div>
          {/* name <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          /> */}
          <Select
          defaultValue={name}
          onChange={setName}
          options={options}
          value={name}
            />
        </div>
        <div>
          born <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">Update author</button>
      </form>
    </div>
  )
}

export default UpdateForm