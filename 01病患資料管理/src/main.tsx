import ReactDOM from 'react-dom/client'
import config from './config'
import autoId from './handlers/autoId'
import showAge from './handlers/showAge'
import disabledField from './utils/disabledField'
import './main.css'

// *** Components ***
import DetailTab from './components/DetailTab'

// *** Events ***
// 分頁 Tab (要放在最上面，避免覆蓋其他事件)
kintone.events.on([
  'app.record.detail.show',
  'app.record.create.show',
  'app.record.edit.show'
], event => {
  const el = kintone.app.record.getSpaceElement('tab')
  ReactDOM.createRoot(el!).render(<DetailTab event={event} />)
})

// 禁止編輯欄位
kintone.events.on(config.events.all.show, event => {
  disabledField(['病歷號碼', '年齡', '預欠收_台幣', '預欠收_美金'], event)
  return event
})

// 病歷號碼自動編碼
kintone.events.on(config.events.create.show, autoId)

// 自動計算當前年齡
kintone.events.on([
  ...config.events.all.show,
  ...config.events.show,
  `app.record.create.change.${config.fc.patient.生日}`,
  `app.record.edit.change.${config.fc.patient.生日}`,
  `mobile.app.record.create.change.${config.fc.patient.生日}`,
  `mobile.app.record.edit.change.${config.fc.patient.生日}`,
], showAge)