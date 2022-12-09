import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

import { useQuery, useMutation } from '@apollo/client'
import {
	ALL_AUTHORS,
	ALL_BOOKS,
	CREATE_BOOK,
	UPDATE_BIRTH_YEAR,
} from './queries'

const App = () => {
	const [page, setPage] = useState('authors')

	const authors = useQuery(ALL_AUTHORS, {
		pollInterval: 2000,
	})
	const books = useQuery(ALL_BOOKS, {
		pollInterval: 2000,
	})

	const [createBook] = useMutation(CREATE_BOOK)
	const [updateBirthYear] = useMutation(UPDATE_BIRTH_YEAR)

	return (
		<div>
			<div>
				<button onClick={() => setPage('authors')}>authors</button>
				<button onClick={() => setPage('books')}>books</button>
				<button onClick={() => setPage('add')}>add book</button>
			</div>

			<Authors
				show={page === 'authors'}
				authors={authors}
				updateBirthYear={updateBirthYear}
			/>

			<Books
				show={page === 'books'}
				books={books}
			/>

			<NewBook
				show={page === 'add'}
				createBook={createBook}
			/>
		</div>
	)
}

export default App
