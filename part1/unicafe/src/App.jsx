import { useState } from 'react'

const Button = ({handleClick, label}) => <button onClick={handleClick}>{label}</button>

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({stats}) => {
  if (stats["good"] >= 1 || stats["neutral"] >=1 || stats["bad"] >= 1) {
    return (
      <>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="good" value={stats["good"]} />
            <StatisticLine text="neutral" value={stats["neutral"]} />
            <StatisticLine text="bad" value={stats["bad"]} />
            <StatisticLine text="all" value={stats["all"]} />
            <StatisticLine text="average" value={stats["average"]} />
            <StatisticLine text="positive" value={stats["positive"]} />
          </tbody>
        </table>
      </>
    )
  }
  return <h4>No feedback given</h4>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (label) => {
    if (label == "good")
      setGood(good + 1)
    else if (label == "neutral")
      setNeutral(neutral + 1)
    else
      setBad(bad + 1)
  }

  const averageFeedback = () => (good - bad) / (good + neutral + bad)
  const positiveFeedback = () => good / (good + neutral + bad) * 100

  const stats = {
    "good" : good,
    "neutral" : neutral,
    "bad" : bad,
    "all" : good + neutral + bad,
    "average" : averageFeedback(),
    "positive" : `${positiveFeedback()} %`
  }
  
  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={() => handleClick("good")} label="good" />
      <Button handleClick={() => handleClick("neutral")} label="neutral" />
      <Button handleClick={() => handleClick("bad")} label="bad" />
      <Statistics stats={stats} />
    </>
  )
}

export default App  