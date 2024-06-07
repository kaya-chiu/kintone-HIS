import { KintoneRestAPIClient } from '@kintone/rest-api-client'
import { KintoneTypes } from '../dts/types'
import config from '../config'

const SCH_APP_ID = 66
const req = new KintoneRestAPIClient()

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