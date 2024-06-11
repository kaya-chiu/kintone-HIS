import { KintoneRestAPIClient } from '@kintone/rest-api-client'
import { KintoneTypes } from '../dts/types'
import config from '../config'

const SCH_APP_ID = 66
const TOKEN = import.meta.env.VITE_API_TOKEN_SCH
const req = new KintoneRestAPIClient({
  auth: { apiToken: TOKEN }
})

export const getSchedule = async (date: string, timeSlot: string, clinic: string) => {
  const res = await req.record.getRecords<KintoneTypes.Sch>({
    app: SCH_APP_ID,
    totalCount: true,
    query: `
      ${config.fc.sch.日期} = "${date}"
      and ${config.fc.sch.門診時段} in ("${timeSlot}")
      and ${config.fc.sch.門診別} in ("${clinic}")
      order by ${config.fc.sch.記錄號碼} desc limit 1
    `
  })
  return res.records[0]
}

export const getScheduleList = async (startDateString: string, endDateString: string | void) => {
  const startDate = new Date(startDateString).toISOString()
  const endDate = endDateString ? new Date(endDateString).toISOString() : startDate

  const res = await req.record.getRecords<KintoneTypes.Sch>({
    app: SCH_APP_ID,
    query: `
      ${config.fc.sch.日期} >= "${startDate}" and ${config.fc.sch.日期} <= "${endDate}"
      order by ${config.fc.sch.日期} asc, ${config.fc.sch.門診時段編號} asc, ${config.fc.sch.門診別} asc
    `
  })
  return res.records
}