import { CoursePart } from '../types'

interface PartProps {
    part: CoursePart;
}

const Part = ( { part } : PartProps) : JSX.Element => {

    const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
    };

    switch (part.type) {
        case "normal":
          return (
            <>
                <p key={part.name}> 
                    <b>{part.name} {part.exerciseCount}</b>
                    <br />
                    <i>{part.description}</i>
                </p>
            </>
          )
        case "groupProject":
          return (
            <>
                <p key={part.name}> 
                    <b>{part.name} {part.exerciseCount}</b>
                    <br />
                    <i>project exercises {part.groupProjectCount}</i>
                </p>
            </>
          )
        case "submission":
            return (
            <>
                <p key={part.name}> 
                    <b>{part.name} {part.exerciseCount}</b>
                    <br />
                    <i>
                        {part.description}
                        <br />
                        submit to {part.exerciseSubmissionLink}
                    </i>
                </p>
            </>
          )
        case "special":
            return (
            <>
                <p key={part.name}> 
                    <b>{part.name} {part.exerciseCount}</b>
                    <br />
                    <i>
                        {part.description}
                        <br />
                        required skills: {part.requirements.join(', ')}
                    </i>
                </p>
            </>
          )
        default:
          return assertNever(part);
    }

}

export default Part