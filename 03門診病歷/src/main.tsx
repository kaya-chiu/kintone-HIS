import ReactDOM from 'react-dom/client'
import { getSpaceElement, isMobile } from 'kchelper'
import hideFields from './handlers/hideFields'
import config from './config'
import disabledField from './handlers/disabledField'
import './main.css'
import ExamDiv from './components/ExamDiv'
import examDataCheck from './handlers/examDataCheck'
import MediDiv from './components/MediDiv'

// 客製化表格
kintone.events.on(config.events.all.show, event => {
  const mobile = isMobile(event)
  const examSpaceEl = getSpaceElement(config.sp.exam, mobile)
  const mediSpaceEl = getSpaceElement(config.sp.medi, mobile)

  ReactDOM.createRoot(examSpaceEl!).render(<ExamDiv event={event}/>)
  ReactDOM.createRoot(mediSpaceEl!).render(<MediDiv event={event}/>)
})
// 編輯畫面隱藏原生表格
kintone.events.on(config.events.all.show, event => {
  hideFields(['用藥', '檢驗'], event)
  return event
})
// 檢查檢驗表格資料
kintone.events.on(config.events.all.submit, examDataCheck)

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