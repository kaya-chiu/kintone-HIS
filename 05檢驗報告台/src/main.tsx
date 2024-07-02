import { KintoneTypes } from './dts/types'

// 禁止編輯欄位
kintone.events.on([
  'app.record.edit.show',
  'mobile.app.record.edit.show',
  'app.record.index.edit.show'
], (event: KintoneTypes.E.Report) => {
  const record = event.record!
  
  record.病歷號碼.disabled = true
  record.檢驗單號.disabled = true
  record.檢驗代碼.disabled = true
  record.採檢時間.disabled = true
  record.報告時間.disabled = true
  record.發報告者.disabled = true

  return event
})

// 流程執行處理
kintone.events.on(['app.record.detail.process.proceed'], (event: KintoneTypes.E.Report) => {
  const { record, action } = event
  const user = kintone.getLoginUser()

  // 發報告：更新報告時間＆發報告者
  if (action!.value === '發報告') {
    record!.報告時間.value = new Date().toISOString()
    record!.發報告者.value = [{ code: user.code, name: user.name }]
    return event
  }
  
  // 撤回：檢查登入使用者是否為發報告者（僅能由發報告者撤回報告）
  if (action!.value === '撤回') {
    if (record!.發報告者.value[0].code !== user.code) {
      event.error = '僅能由發報告者撤回'
      return event
    }
  }
})