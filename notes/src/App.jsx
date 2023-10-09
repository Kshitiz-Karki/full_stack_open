import { useState, useEffect } from 'react'
import Note from './components/Note'
import axios from 'axios'

const App = () => {
	const [notes, setNotes] = useState([])
	const [newNote, setNewNote] = useState('a new note ...')
	const [showAll, setShowAll] = useState(true)

	useEffect(() => {
		axios.get('http://localhost:3001/notes').then((response) => {
			setNotes(response.data)
		})
	}, [])

	const notesToShow = showAll ? notes : notes.filter((note) => note.important)

	const saveNote = (event) => {
		event.preventDefault()
		const note = {
			id: notes.length + 1,
			content: newNote,
			important: Math.random() < 0.5,
		}
		setNotes(notes.concat(note))
		setNewNote('')
	}

	const handleChange = (event) => {
		setNewNote(event.target.value)
	}

	return (
		<>
			<h1>Notes</h1>
			<div>
				<button onClick={() => setShowAll(!showAll)}>
					show {showAll ? 'important' : 'all'}
				</button>
			</div>
			<ul>
				{notesToShow.map((note) => (
					<Note
						key={note.id}
						content={note.content}
					/>
				))}
			</ul>
			<form onSubmit={saveNote}>
				<input
					value={newNote}
					onChange={handleChange}
				/>
				<button type="submit">save</button>
			</form>
		</>
	)
}

export default App
