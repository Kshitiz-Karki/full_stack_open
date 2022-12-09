import { useState } from 'react'

const Authors = ({ show, authors, updateBirthYear }) => {
	const [name, setName] = useState('')
	const [born, setBorn] = useState('')

	if (!show) {
		return null
	}

	const submit = async (event) => {
		event.preventDefault()

		const birthYear = parseInt(born)
		updateBirthYear({ variables: { name, birthYear } })

		setName('')
		setBorn('')
	}

	if (authors.loading) {
		return <div>loading...</div>
	}

	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>born</th>
						<th>books</th>
					</tr>
					{authors.data.allAuthors.map((a) => (
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>

			<h2>set birth year</h2>

			<form onSubmit={submit}>
				<div>
					name:
					<select
						value={name}
						onChange={({ target }) => setName(target.value)}
					>
						{authors.data.allAuthors.map((a) => (
							<option
								key={a.name}
								value={a.name}
							>
								{a.name}
							</option>
						))}
					</select>
				</div>

				<div>
					born:
					<input
						type="number"
						value={born}
						onChange={({ target }) => setBorn(target.value)}
					/>
				</div>

				<button type="submit">update author</button>
			</form>
		</div>
	)
}

export default Authors
