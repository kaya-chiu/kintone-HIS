import { KintoneRestAPIClient } from '@kintone/rest-api-client'

const PATIENT_APP_ID = 51
const req = new KintoneRestAPIClient({
  auth: { apiToken: import.meta.env.VITE_API_TOKEN }
})

export const getLastPatient = async (cn: string) => {
  const res = await req.record.getRecords({
    app: PATIENT_APP_ID,
    query: `order by ${cn} desc limit 1`
  })
  return res.records[0]
}