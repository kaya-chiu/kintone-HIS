import { KintoneRestAPIClient } from '@kintone/rest-api-client'
import { KintoneTypes } from '../dts/types'
import { DataType } from '../components/ExamTable'

type Post = Pick<KintoneTypes.Report, '病歷號碼' | '檢驗代碼' | '檢驗單號'>

const APP_ID = 70
const req = new KintoneRestAPIClient({
  auth: {
    apiToken: [
      import.meta.env.VITE_API_TOKEN_REP,
      import.meta.env.VITE_API_TOKEN_ECI,
      import.meta.env.VITE_API_TOKEN_PAT,
      import.meta.env.VITE_API_TOKEN_EDB
    ]
  }
})

export const postReport = async (rows: DataType[]) => {
  const records: Post[] = rows.map(row => ({
    '病歷號碼': { value: row.cn },
    '檢驗代碼': { value: row.code },
    '檢驗單號': { value: row.serialNum }
  }))

  const res = await req.record.addRecords({
    app: APP_ID,
    records
  })

  return res
}