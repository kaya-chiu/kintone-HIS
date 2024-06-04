import { useState } from 'react'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState<number>(0)
  return (
    <div className="box">
      <div className="box__wrapper">
        <img src={viteLogo} className="logo" alt="Vite logo" />
        <p className="box__title">Kintone × Vite × React</p>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </div>
  )
}

export default App
