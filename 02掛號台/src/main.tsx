import { getSpaceElement, isMobile } from 'kchelper'
import config from './config'
import autoId from './handlers/autoId'
import autoLookupPatient from './handlers/autoLookupPatient'
import dateCheck from './handlers/dateCheck'
import disabledField from './handlers/disabledField'
import scheduleCheck from './handlers/scheduleCheck'
import ReactDOM from 'react-dom/client'
import OpdSearchButton from './components/OpdSearchButton'
import './main.css'
import checkin from './handlers/checkin'

// ** Events **
// 門診搜尋按鈕
kintone.events.on(config.events.all.show, event => {
  const el = getSpaceElement(config.sp.search, isMobile(event))
  ReactDOM.createRoot(el!).render(<OpdSearchButton event={event}/>)
})

kintone.events.on(['app.record.detail.show', 'mobile.record.detail. show'], () => {
  const el: HTMLElement | null = document.querySelector(config.el.spacer)
  // @ts-expect-error: detail.show 畫面隱藏 spacer 元素
  if (el) el.style = 'display: none'
})

// 禁止編輯欄位
kintone.events.on(config.events.all.show, event => {
  disabledField(['掛號流水號', '門診表記錄號碼', '看診序號'], event)
  return event
})
kintone.events.on(config.events.edit.show, event => {
  disabledField(['就診日期', '病歷號碼'], event)
  return event
})

// 從病患資料以動作按鈕建立新掛號時，自動執行病患 LOOKUP
kintone.events.on(config.events.create.show, autoLookupPatient)

// 建立、編輯掛號時，自動產生掛號流水號、檢查門診表、檢查日期
kintone.events.on(config.events.create.submit, autoId)
kintone.events.on(config.events.all.submit, dateCheck)
kintone.events.on([
  ...config.events.all.submit,
  ...config.events.all.success
], scheduleCheck)

// 報到流程
kintone.events.on([
  'app.record.detail.process.proceed',
  'mobile.app.record.detail.process.proceed'
], checkin)