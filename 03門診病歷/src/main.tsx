import ReactDOM from 'react-dom/client'
import { getSpaceElement, isMobile } from 'kchelper'
import hideFields from './handlers/hideFields'
import config from './config'
import disabledField from './handlers/disabledField'
import './main.css'
import ExamDiv from './components/ExamDiv'
import examDataCheck from './handlers/examDataCheck'
import MediDiv from './components/MediDiv'
import TreaDiv from './components/TreaDiv'
import payStatusHandler from './handlers/payStatusHandler'
import GetBalanceBtn from './components/GetBalanceBtn'
import mediStatusHandler from './handlers/mediStatusHandler'
import ExamOrderBtn from './components/ExamOrderBtn'

// 客製化表格
kintone.events.on(config.events.all.show, event => {
  const mobile = isMobile(event)
  const examSpaceEl = getSpaceElement(config.sp.exam, mobile)
  const mediSpaceEl = getSpaceElement(config.sp.medi, mobile)
  const treaSpaceEl = getSpaceElement(config.sp.trea, mobile)
  const getbSpaceEl = getSpaceElement(config.sp.getb, mobile)

  ReactDOM.createRoot(examSpaceEl!).render(<ExamDiv event={event}/>)
  ReactDOM.createRoot(mediSpaceEl!).render(<MediDiv event={event}/>)
  ReactDOM.createRoot(treaSpaceEl!).render(<TreaDiv event={event}/>)
  ReactDOM.createRoot(getbSpaceEl!).render(<GetBalanceBtn event={event}/>)
})
// 編輯畫面隱藏原生表格
kintone.events.on(config.events.all.show, event => {
  hideFields(['用藥', '處置', '檢驗'], event)
  return event
})

// 急開抽血單按鈕
kintone.events.on(['app.record.detail.show', 'mobile.app.detail.show'], event => {
  const mobile = isMobile(event)
  const examSpaceEl = getSpaceElement(config.sp.exam, mobile)
  ReactDOM.createRoot(examSpaceEl!).render(<ExamOrderBtn event={event}/>)
})

// 檢查檢驗表格資料
kintone.events.on(config.events.all.submit, examDataCheck)

// 批價狀態控制
kintone.events.on([
  ...config.events.all.submit, 
  ...config.events.process.proceed
], payStatusHandler)

// 領藥狀態控制
kintone.events.on([
  ...config.events.all.submit, 
  ...config.events.process.proceed
], mediStatusHandler)

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
    '病歷號碼', '批價狀態', '掛號流水號', '預欠收', '已領藥',
  ], event)
  return event
})