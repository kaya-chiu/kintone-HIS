import { KintoneRestAPIClient } from '@kintone/rest-api-client'
import { KintoneTypes } from '../dts/types'
import config from '../config'

const OPD_APP_ID = 55
// const TOKEN = import.meta.env.VITE_API_TOKEN_OPD
const USERNAME = import.meta.env.VITE_API_USERNAME
const PASSWORD = import.meta.env.VITE_API_PASSWORD
const req = new KintoneRestAPIClient({
  auth: { username: USERNAME, password: PASSWORD }
})

export const postOpdRecord = async (record: KintoneTypes.Opd) => {
  const res = await req.record.addRecord({
    app: OPD_APP_ID,
    record
  })
  console.log('postOpdRecord:', res)
  
  if (!res.id) throw new Error('postOpdRecord: failed to post OPD record')
  return res
}

export const putOpdStatus = async (recordId: string, action: string) => {
  const res = await req.record.updateRecordStatus({
    app: OPD_APP_ID,
    id: recordId,
    action,
  }) 
  console.log('putOpdStatus:', res)

  if (!res.revision) throw new Error('putOpdStatus: failed to update status')
  return res
}

export const getOpdRecordId = async (serialNumber: string): Promise<string> => {
  const res = await req.record.getRecords({
    app: OPD_APP_ID,
    fields: [config.fc.opd.$id],
    query: `
      ${config.fc.opd.病歷記錄流水號} = "${serialNumber}"
      order by ${config.fc.opd.$id} asc limit 1
    `
  })
  console.log('getOpdRecordId:', res)
  
  if (res.records.length === 0) throw new Error('getOpdRecordId: failed to find OPD record')
  return res.records[0].$id.value as string
}