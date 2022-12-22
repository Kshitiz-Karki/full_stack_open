const Recommendations = ({ show, books, favouriteGenre }) => {
	if (!show) {
		return null
	}

	if (books.loading) {
		return <div>loading...</div>
	}

	return (
		<div>
			<h2>recommendations</h2>
			books in your favourite genre <b>{favouriteGenre}</b>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
						<th>genres</th>
					</tr>
					{books.data.allBooks
						.filter((book) => book.genres.includes(favouriteGenre))
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
		</div>
	)
}

export default Recommendations
