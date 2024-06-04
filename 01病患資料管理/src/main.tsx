import config from './config'
import autoId from './handlers/autoId'
import showAge from './handlers/showAge'
import disabledField from './utils/disabledField'
import './main.css'

// import ReactDOM from 'react-dom/client'
// import App from './App.tsx'

// kintone.events.on('app.record.index.show', () => {
//   const el = kintone.app.getHeaderSpaceElement()
//   ReactDOM.createRoot(el!).render(<App />)
// })

kintone.events.on(config.events.all.show, event => {
  disabledField(['病歷號碼', '年齡', '預欠收_台幣', '預欠收_美金'], event)
  return event
})

kintone.events.on(config.events.create.show, autoId)

kintone.events.on([
  ...config.events.all.show,
  ...config.events.show,
  `app.record.create.change.${config.fc.patient.生日}`,
  `app.record.edit.change.${config.fc.patient.生日}`,
  `mobile.app.record.create.change.${config.fc.patient.生日}`,
  `mobile.app.record.edit.change.${config.fc.patient.生日}`,
], showAge)