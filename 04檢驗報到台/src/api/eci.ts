import { KintoneRestAPIClient } from '@kintone/rest-api-client'
import { KintoneTypes } from '../dts/types'
import config from '../config'
import { DataType } from '../views/EciPage'

type SearchProps = {
  cn: string | null | undefined;
  startDate: string;
  endDate: string;
} | void

type Group<T extends string> = {
  [key in T]?: { barcode: string }
}

const APP_ID = 68
const req = new KintoneRestAPIClient({
  auth: {
    apiToken: import.meta.env.VITE_API_TOKEN_ECI
  }
})

export const getEciRecords = async (searchProps: SearchProps) => {
  if (!searchProps) {
    const today = new Date().toISOString()
    const res = await req.record.getRecords({
      app: APP_ID,
      query: `
        ${config.fc.eci.檢驗日期} = "${today}"
        order by ${config.fc.eci.病歷號碼} asc
      `
    })  
    return res.records as KintoneTypes.ECI[]
  }

  const { cn, startDate, endDate } = searchProps
  const start = new Date(startDate).toISOString()
  const end = new Date(endDate).toISOString()
  const patientQuery = cn ? `and ${config.fc.eci.病歷號碼} = "${cn}"` : ''
  const query = `
    ${config.fc.eci.檢驗日期} >= "${start}" and ${config.fc.eci.檢驗日期} <= "${end}"
    ${patientQuery}
    order by ${config.fc.eci.檢驗日期} desc
  `
  const res = await req.record.getRecords({
    app: APP_ID,
    query
  })
  return res.records as KintoneTypes.ECI[]
}

export const putEciStatus = async (rows: DataType[]) => {
  const records = rows.map(row => ({
    id: row.recordId,
    action: '報到'
  }))
  const res = await req.record.updateRecordsStatus({
    app: APP_ID,
    records
  })

  return res
}

export const getLastBarcode = async () => {
  const res = await req.record.getRecords({
    app: APP_ID,
    query:`order by ${config.fc.eci.條碼號} desc limit 1`
  })

  // 若無資料，回傳 null
  if (res.records.length === 0) {
    return '0'
  }

  const record = res.records[0] as KintoneTypes.ECI
  return record.條碼號.value
}

export const reGenerateBarcode = async (rows: DataType[]) => {
  const groupedData: Group<string> = {}
  async function rowProcess (row: DataType) {
    // 將病歷號和分管組合結合成組別key
    const key = `${row.cn}-${row.group}`
    
    // 若key不存在，則新增key
    if (!(key in groupedData)) {
      // 透過API最後一筆資料的barcode
      const lastBarcode = await getLastBarcode()
      groupedData[key] = {
        barcode: (Number(lastBarcode) + 1).toString().padStart(14, '0')
      }
    }
    const barcode = groupedData[key]!.barcode
    
    await req.record.updateRecord({
      app: APP_ID,
      id: row.recordId,
      record: { 條碼號: { value: barcode } }
    })
  }

  for (const row of rows) {
    await rowProcess(row)
  }
  console.log(rows)
}

