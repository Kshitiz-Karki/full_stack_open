const Header = ({ courseName }) => <h1>{courseName}</h1>

const Part = ({ part }) => (
	<p>
		{part.name} {part.exercises}
	</p>
)

const Content = ({ parts }) => {
	return (
		<>
			{parts.map((part) => (
				<Part
					key={part.id}
					part={part}
				/>
			))}
		</>
	)
}

const Total = ({ parts }) => (
	<b>
		total of {parts.reduce((sum, part) => sum + part.exercises, 0)}{' '}
		exercises
	</b>
)

const Course = ({ course }) => {
	return (
		<>
			<Header courseName={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</>
	)
}

export default Course
