import { CoursePart } from '../types'
import Part from './Part'

interface ContentProps {
  courseParts:  CoursePart[];
}

const Content = ( { courseParts }  : ContentProps) : JSX.Element => {
    return (
      <>
        {
         courseParts.map(course => 
            <Part key={course.name} part={course}/>)
        }
      </>
    )
}

export default Content