import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value} {text === 'positive' ? '%' : ''}</td> 
    </tr>
  )
}

const Statistics = ({good, ok, bad, all, average, positive}) => {
  if (good !== 0 || ok !== 0 || bad !== 0){
    return (
      <>
        <h1>
          statistics
        </h1>
        <table>
          <tbody>
            <StatisticLine text="good" value ={good} />
            <StatisticLine text="ok" value ={ok} />
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

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const reset = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  const all = store.getState().good + store.getState().bad + store.getState().ok
  const average = (store.getState().good - store.getState().bad) / all
  const positive = (store.getState().good / all) * 100

  return (
    <div>
      <h1>
        give feedback
      </h1>

      <button onClick={good}>good</button>
      <button onClick={ok}>ok</button>
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      
      <Statistics
        good={store.getState().good}
        ok={store.getState().ok}
        bad={store.getState().bad}
        all={all}
        average={average}
        positive={positive} 
      />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
