import { KintoneRestAPIClient } from '@kintone/rest-api-client'
import { KintoneTypes } from '../dts/types'

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