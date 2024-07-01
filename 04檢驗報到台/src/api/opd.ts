import { KintoneRestAPIClient } from '@kintone/rest-api-client'
import { KintoneTypes } from '../dts/types'

const APP_ID = 55
const req = new KintoneRestAPIClient({
  auth: {
    apiToken: [
      import.meta.env.VITE_API_TOKEN_OPD,
      import.meta.env.VITE_API_TOKEN_EDB,
      import.meta.env.VITE_API_TOKEN_ECI
    ]
  }
})

export const putOpdExamStatus = async (opdNum: string, serialNum: string) => {
  const res = await req.record.getRecords({
    app: APP_ID,
    query: `
      病歷記錄流水號 = "${opdNum}"
      order by 病歷記錄流水號 asc limit 1
    `
  })
  if (res.records.length === 0) throw new Error('putOpdExamCancel: Failed to get opd record')
  
  const record = res.records[0] as KintoneTypes.Opd
  const exam = record.檢驗.value

  const updatedExam = exam.map(row => {
    if (row.value.檢驗單號.value === serialNum && row.value.檢驗單狀態.value === '已開') {
      row.value.檢驗單狀態.value = '已抽'
    }
    return row
  })

  const res2 = await req.record.updateRecord({
    app: APP_ID,
    id: record.$id.value,
    record: {
      檢驗: { value: updatedExam }
    }
  })
  if (!res2.revision) throw new Error('putOpdExamCancel: Failed to update opd examination table')
}