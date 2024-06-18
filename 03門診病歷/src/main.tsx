import ReactDOM from 'react-dom/client'
import { getSpaceElement, hideField, isMobile } from 'kchelper'
import hideFields from './handlers/hideFields'
import config from './config'
import disabledField from './handlers/disabledField'
import './main.css'
import ExamDiv from './components/ExamDiv'
import examDataCheck from './handlers/examDataCheck'

kintone.events.on(config.events.all.show, event => {
  const el = getSpaceElement(config.sp.exam, isMobile(event))
  ReactDOM.createRoot(el!).render(<ExamDiv event={event}/>)
})
kintone.events.on(config.events.all.show, event => {
  hideField(config.fc.opd.檢驗, isMobile(event))
  return event
})
kintone.events.on(config.events.all.submit, examDataCheck)

// kintone.events.on(['app.record.detail.show', 'mobile.record.detail. show'], () => {
//   const el: HTMLElement | null = document.querySelector(config.el.spacer)
//   console.log(el)
//   // @ts-expect-error: detail.show 畫面隱藏 spacer 元素
//   if (el) el.style = 'min-width: 0px; min-height: 0px;'
// })

// 隱藏欄位
kintone.events.on([
  'app.record.detail.show',
  'mobile.app.detail.show',
  'app.record.create.show',
  'mobile.app.record.create.show',
  'app.record.edit.show',
  'mobile.app.record.edit.show',
], event => {
  hideFields([
    '掛號費_台幣', '掛號費_美金'
  ], event)
  return event
})

// 禁止編輯欄位
kintone.events.on(config.events.all.show, event => {
  disabledField([
    '病歷號碼',
  ], event)
  return event
})