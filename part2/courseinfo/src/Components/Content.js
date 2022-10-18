import Part from "./Part"
import Total from "./Total"

const Content = ({parts}) => {
    
    return (
        <>
            {parts.map(part => <Part part={part.name} exercises={part.exercises} key={part.id} />)}
            <Total sum={parts.reduce((sum, part) => sum + part.exercises, 0)} />
        </>
    )
  }
  
  export default Content