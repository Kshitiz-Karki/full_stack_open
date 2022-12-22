import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

import {
	useQuery,
	useMutation,
	useApolloClient,
	useSubscription,
} from '@apollo/client'
import {
	ALL_AUTHORS,
	ALL_BOOKS,
	CREATE_BOOK,
	UPDATE_BIRTH_YEAR,
	ME,
	BOOK_ADDED,
} from './queries'

export const updateCache = (cache, query, addedBook) => {
	const uniqByName = (a) => {
		let seen = new Set()
		return a.filter((item) => {
			let k = item.title
			return seen.has(k) ? false : seen.add(k)
		})
	}

	cache.updateQuery(query, ({ allBooks }) => {
		return {
			allBooks: uniqByName(allBooks.concat(addedBook)),
		}
	})
}

const App = () => {
	const [genre, setGenre] = useState('all')
	const [token, setToken] = useState(null)
	const [page, setPage] = useState('authors')

	const currentUser = useQuery(ME, {
		pollInterval: 2000,
	})

	const authors = useQuery(ALL_AUTHORS, {
		pollInterval: 2000,
	})
	const books = useQuery(ALL_BOOKS) //, {
	//pollInterval: 2000,
	//})

	const [createBook] = useMutation(CREATE_BOOK, {
		onError: (error) => {
			console.log('error - ', error.graphQLErrors[0].message)
		},
		update: (cache, response) => {
			updateCache(cache, { query: ALL_BOOKS }, response.data.addBook)
		},
	})

	const [updateBirthYear] = useMutation(UPDATE_BIRTH_YEAR)

	const client = useApolloClient()

	useSubscription(BOOK_ADDED, {
		onData: ({ data, client }) => {
			const addedBook = data.data.bookAdded
			window.alert(`${addedBook.title} added`)
			updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
		},
	})

	if (!token) {
		return (
			<>
				<h2>Login</h2>
				<LoginForm setToken={setToken} />
			</>
		)
	}

	const logout = () => {
		setToken(null)
		localStorage.clear()
		client.resetStore()

		setPage('authors')
		setGenre('all')
	}

	if (currentUser.loading) {
		return <div>loading...</div>
	}

	let favouriteGenre = ''
	if (currentUser.data.me) {
		favouriteGenre = currentUser.data.me.favouriteGenre
	}

	return (
		<div>
			<div>
				<button onClick={() => setPage('authors')}>authors</button>
				<button onClick={() => setPage('books')}>books</button>
				<button onClick={() => setPage('add')}>add book</button>
				<button onClick={() => setPage('recommend')}>recommend</button>
				<button onClick={logout}>logout</button>
			</div>

			<Authors
				show={page === 'authors'}
				authors={authors}
				updateBirthYear={updateBirthYear}
			/>

			<Books
				show={page === 'books'}
				books={books}
				genre={genre}
				setGenre={setGenre}
			/>

			<NewBook
				show={page === 'add'}
				createBook={createBook}
			/>

			<Recommendations
				show={page === 'recommend'}
				books={books}
				favouriteGenre={favouriteGenre}
			/>
		</div>
	)
}

export default App
