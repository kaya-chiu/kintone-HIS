import { putScheduleId } from '../api/appo'
import { getSchedule } from '../api/schedule'
import config from '../config'
import { KintoneTypes } from '../dts/types'

const checkList = ['一診', '二診']

const scheduleCheck = async (event: KintoneTypes.E.Appo) => {
  const record = event.record!
  const clinic = record.門診別.value!

  // 非選擇一位看診醫師則報錯
  if (record.看診醫師.value.length !== 1) {
    event.error = '必須且僅能選擇一位看診醫師'
    return event
  }

  // 如果門診別不包含在變數「checkList」內，則直接返回（不用檢查門診表）
  if (!checkList.includes(clinic)) {
    if (!record.門診表記錄號碼.value) return event

    // 如果之前存在門診表記錄號碼，則更新記錄
    if (config.events.all.success.includes(event.type)) {
      const recordId = kintone.app.record.getId()!
      await putScheduleId(recordId, '')
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

  // 如果看診醫師不符，則報錯
  if (record.看診醫師.value[0].code !== schedule.看診醫師.value[0].code) {
    event.error = `此門診看診醫師為${schedule.看診醫師.value[0].name}醫師`
    return event
  }

  if (config.events.all.success.includes(event.type)) {
    const scheduleId = schedule.記錄號碼.value
    
    // 如果門診表記錄號碼沒有變動，則直接返回（不更新記錄）
    if (record.門診表記錄號碼.value === scheduleId) return event

    // 更新記錄
    const recordId = kintone.app.record.getId()!
    await putScheduleId(recordId, scheduleId)
    return event
  }
  
  return event
}

export default scheduleCheck