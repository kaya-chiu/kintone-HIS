import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState<number>(0)
  return (
    <div className="box">
      <div className="box__wrapper">
        <p className="box__title">Kintone × Vite × React</p>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </div>
  )
}

export default App
