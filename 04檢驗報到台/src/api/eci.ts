import { KintoneRestAPIClient } from '@kintone/rest-api-client'
import { KintoneTypes } from '../dts/types'
import config from '../config'

type SearchProps = {
  cn: string | null | undefined;
  startDate: string;
  endDate: string;
} | void

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