const Books = ({ show, books, genre, setGenre }) => {
	if (!show) {
		return null
	}

	if (books.loading) {
		return <div>loading...</div>
	}

	let genres = []

	books.data.allBooks.forEach((element) => {
		element.genres.forEach((genre) => {
			if (!genres.includes(genre)) {
				genres.push(genre)
			}
		})
	})

	return (
		<div>
			<h2>books</h2>
			in genre <b>{genre}</b>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
						<th>genres</th>
					</tr>
					{books.data.allBooks
						.filter((book) =>
							book.genres.includes(genre) || genre === 'all'
								? true
								: false
						)
						.map((a) => (
							<tr key={a.title}>
								<td>{a.title}</td>
								<td>{a.author.name}</td>
								<td>{a.published}</td>
								<td>{a.genres.join(', ')}</td>
							</tr>
						))}
				</tbody>
			</table>
			<br />
			{genres.map((genre) => (
				<button
					key={genre}
					onClick={() => setGenre(genre)}
				>
					{genre}
				</button>
			))}
			<button onClick={() => setGenre('all')}>all genres</button>
		</div>
	)
}

export default Books
