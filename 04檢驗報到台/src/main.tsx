import ReactDOM from 'react-dom/client'
import './main.css'
import EciPage from './views/EciPage'

kintone.events.on('app.record.index.show', () => {
  const el = document.querySelector('#cus-div-eci')
  if (!el) return

  ReactDOM.createRoot(el).render(<EciPage />)
})