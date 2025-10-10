import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <div className="card">
        {count}
        {count === 10 && (
          <p className="limit-message">Maximum limit reached</p>
        )}
      </div>
      <div className="card">
        <button
          onClick={() => setCount(count => (count < 10 ? count + 1 : count))}>
          Increment
        </button>
      </div>
      <div className="card">
        <button
          onClick={() =>
            setCount(prevCount => (prevCount > 0 ? prevCount - 1 : prevCount))
          }>
          Decrement
        </button>
      </div>
      <div className="card">
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
    </>
  )
}

export default App
