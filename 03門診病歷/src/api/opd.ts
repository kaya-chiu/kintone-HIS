import { KintoneRestAPIClient } from '@kintone/rest-api-client'
import { KintoneTypes } from '../dts/types'
import config from '../config'

type Cancel = {
  opdNum: string;
  serialNum: string;
  cancelFrom: string;
}
type Return = {
  opdRecordId: string | null;
  sameOpdRecord: boolean;
}

const req = new KintoneRestAPIClient({
  auth: {
    apiToken: [
      import.meta.env.VITE_API_TOKEN_OPD,
      import.meta.env.VITE_API_TOKEN_EDB,
      import.meta.env.VITE_API_TOKEN_ECI
    ]
  }
})
const APP_ID = 55

export const putOpdExamTable = async (recordId: string, table: KintoneTypes.ExamTable[]) => {
  const res = await req.record.updateRecord({
    app: APP_ID,
    id: recordId,
    record: {
      檢驗: {
        value: table
      }
    }
  })

  if (!res.revision) throw new Error('檢驗表格更新失敗')
  return res
}

export const putOpdExamCancel = async ({ opdNum, serialNum, cancelFrom } : Cancel): Promise<Return> => {
  const res = await req.record.getRecords({
    app: APP_ID,
    query: `
      ${config.fc.opd.病歷記錄流水號} = "${opdNum}"
      order by ${config.fc.opd.病歷記錄流水號} asc limit 1
    `
  })
  if (res.records.length === 0) throw new Error('putOpdExamCancel: Failed to get opd record')
  
  const record = res.records[0] as KintoneTypes.Opd
  const exam = record.檢驗.value

  // 檢查是否有可以退單的項目
  const canBeCanceled = exam.filter(row => row.value.檢驗單號.value === serialNum && row.value.檢驗單狀態.value === '已開')
  if (canBeCanceled.length === 0) throw new Error('無可對應之退單項目')
  
  // 檢查欲更新之門診病歷是否與執行退單的來源相同，若相同則不在此執行更新記錄的API
  if (opdNum === cancelFrom) return { opdRecordId: record.$id.value, sameOpdRecord: true }

  // 更新目標與來源不同時，以API更新記錄
  const updatedExam = exam.map(row => {
    if (row.value.檢驗單號.value === serialNum && row.value.檢驗單狀態.value === '已開') {
      row.value.檢驗單狀態.value = '取消'
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
  
  return { opdRecordId: record.$id.value, sameOpdRecord: false }
}