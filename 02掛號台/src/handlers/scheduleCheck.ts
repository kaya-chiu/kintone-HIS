import { putScheduleId } from '../api/appo'
import { getSchedule } from '../api/schedule'
import config from '../config'
import { KintoneTypes } from '../dts/types'

const checkList = ['一診', '二診']

const scheduleCheck = async (event: KintoneTypes.E.Appo) => {
  const record = event.record!
  const clinic = record.門診別.value!

  // 如果門診別不包含在變數「checkList」內，則直接返回（不用檢查門診表）
  if (!checkList.includes(clinic)) {
    if (!record.門診表記錄號碼.value) return event

    // 如果之前存在門診表記錄號碼，則更新記錄並重整
    if (config.events.all.success.includes(event.type)) {
      const recordId = kintone.app.record.getId()!
      putScheduleId(recordId, '')
      setTimeout(() => location.reload(), 300)
    }
    return event
  }

  // 若門診別符合「checkList」內的項目，檢查該門診是否存在於門診表內
  const date = record.就診日期.value!
  const timeSlot = record.門診時段.value!
  const schedule = await getSchedule(date, timeSlot, clinic)
  
  // 若查無對應門診，則報錯
  if (!schedule) {
    event.error = `查無此門診：${date} ${timeSlot} ${clinic}`
    return event
  }

  if (config.events.all.success.includes(event.type)) {
    const scheduleId = schedule.記錄號碼.value
    
    // 如果門診表記錄號碼沒有變動，則直接返回（不更新記錄）
    if (record.門診表記錄號碼.value === scheduleId) return event

    // 更新記錄 & 重新整理頁面（畫面上的「門診表記錄號碼」要重整才會更新）
    const recordId = kintone.app.record.getId()!
    putScheduleId(recordId, scheduleId)
    setTimeout(() => location.reload(), 300)
    return event
  }
  
  return event
}

export default scheduleCheck