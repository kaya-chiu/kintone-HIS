import ReactDOM from 'react-dom/client'

kintone.events.on('app.record.index.show', () => {
  const el = kintone.app.getHeaderSpaceElement()
  ReactDOM.createRoot(el!).render(<h1>Project init</h1>)
})
