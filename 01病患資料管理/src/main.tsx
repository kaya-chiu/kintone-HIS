import disabledField from './utils/disabledField'

// import ReactDOM from 'react-dom/client'
// import App from './App.tsx'

// kintone.events.on('app.record.index.show', () => {
//   const el = kintone.app.getHeaderSpaceElement()
//   ReactDOM.createRoot(el!).render(<App />)
// })

kintone.events.on([
  'app.record.create.show',
  'app.record.edit.show',
  'app.record.index.edit.show',
  'mobile.app.record.create.show',
  'mobile.app.record.edit.show'
], event => {
  disabledField(['病歷號碼', '年齡', '預欠收_台幣', '預欠收_美金'], event)
  return event
})

