import { KintoneRestAPIClient } from '@kintone/rest-api-client'
import { KintoneTypes } from '../dts/types'

const PATIENT_APP_ID = 51
const req = new KintoneRestAPIClient()

export const getLastPatient = async (cn: string) => {
  const res = await req.record.getRecords<KintoneTypes.Patient>({
    app: PATIENT_APP_ID,
    query: `order by ${cn} desc limit 1`
  })
  return res.records[0]
}