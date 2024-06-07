import { KintoneRestAPIClient } from '@kintone/rest-api-client'
import { KintoneTypes } from '../dts/types'
import config from '../config'

const APPO_APP_ID = 56
const req = new KintoneRestAPIClient()

type Rec<T extends string> = {
  [key in T]?: {
    value: string | string[] | object[] | void
  }
}

export const getLastAppo = async (date: string, cn: string) => {
  const res = await req.record.getRecords<KintoneTypes.Appo>({
    app: APPO_APP_ID,
    query: `
      ${config.fc.appo.就診日期} = "${date}" and ${config.fc.appo.病歷號碼} = "${cn}"
      order by ${config.fc.appo.掛號流水號} desc limit 1
    `
  })
  return res.records[0]
}

export const putScheduleId = async (recordId: string | number, scheduleId: string) => {
  const updateRecord: Rec<keyof KintoneTypes.Appo> = {
    '門診表記錄號碼': { value: undefined }
  }
  updateRecord.門診表記錄號碼!.value = scheduleId

  await req.record.updateRecord({
    app: APPO_APP_ID,
    id: recordId,
    record: updateRecord
  })
}