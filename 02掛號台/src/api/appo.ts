import { KintoneRestAPIClient } from '@kintone/rest-api-client'
import { KintoneTypes } from '../dts/types'
import config from '../config'

const APPO_APP_ID = 56
const req = new KintoneRestAPIClient()

export const getLastAppo = async (date: string, cn: string) => {
  const res = await req.record.getRecords<KintoneTypes.Appo>({
    app: APPO_APP_ID,
    query: `
      ${config.fc.appo.就診日期} = "${date}" and ${config.fc.appo.病歷號碼} = "${cn}"
      order by ${config.fc.appo.掛號流水號} desc limit 1
    `
  })
  console.log(res)
  return res.records[0]
}