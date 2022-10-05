import React, { useState } from 'react';

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value} {text === 'positive' ? '%' : ''}</td> 
    </tr>
  )
}

const Statistics = ({good, neutral, bad, all, average, positive}) => {
  if (good !== 0 || neutral !== 0 || bad !== 0){
    return (
      <>
        <h1>
          statistics
        </h1>
        <table>
          <tbody>
            <StatisticLine text="good" value ={good} />
            <StatisticLine text="neutral" value ={neutral} />
            <StatisticLine text="bad" value ={bad} />
            <StatisticLine text="all" value ={all} />
            <StatisticLine text="average" value ={average} />
            <StatisticLine text="positive" value ={positive} />
          </tbody>
        </table>    
      </>
    )
  }
  return (
    <h4>
      No feedback given
    </h4>
  )
}

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + bad + neutral
  const average = (good - bad) / all
  const positive = (good / all) * 100

  return (
    <>
      <h1>
        give feedback
      </h1>

      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive} />
    </>
  )
}

export default App