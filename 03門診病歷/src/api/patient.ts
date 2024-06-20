import { KintoneRestAPIClient } from '@kintone/rest-api-client'

const req = new KintoneRestAPIClient()
const APP_ID = 51

export const getPatientBalance = async (cn: string) => {
  const res = await req.record.getRecords({
    app: APP_ID,
    fields: ['預欠收_台幣', '預欠收_美金'],
    query: `病歷號碼 = "${cn}"`
  })

  // 查無病歷號碼時的報錯
  if (res.records.length !== 1) throw new Error(`查無病歷號：${cn}`)

  const balance = {
    台幣: res.records[0].預欠收_台幣.value,
    美金: res.records[0].預欠收_美金.value
  }
  return balance
}