import React, { useState } from 'react';

const MostVotes = ({anecdotes, maxVotes, voteCount}) => {
  return (
    <>
      {anecdotes[maxVotes]}<br />
      has {voteCount[maxVotes]} votes
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  
  const [selected, setSelected] = useState(Math.floor(Math.random() * anecdotes.length))
  const [voteCount, setVoteCount] = useState(Array(anecdotes.length).fill(0))
  const [maxVotes, setMaxVotes] = useState(0)
  
  const handleVoteCount = () => {
    const newVoteCount = [...voteCount]
    newVoteCount[selected] += 1
    setVoteCount(newVoteCount)
    setMaxVotes(newVoteCount.indexOf(Math.max(...newVoteCount)))
  }

  return (
    <>
      <h1>
        Anecdote of the day
      </h1>
      {anecdotes[selected]}<br />
      has {voteCount[selected]} votes<br />
      <button onClick={handleVoteCount}>vote</button>
      <button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>next anecdote</button>
      <h1>
        Anecdote with most votes
      </h1>
      {maxVotes === 0 ? 'None' : <MostVotes anecdotes={anecdotes} maxVotes={maxVotes} voteCount={voteCount} />}
    </>
  )
}

export default App