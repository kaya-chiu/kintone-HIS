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
    台幣: res.records[0].預欠收_台幣.value || '0',
    美金: res.records[0].預欠收_美金.value || '0'
  }
  return balance
}

export const putPatientBalance = async (cn: string, balance: string, currency: string) => {
  type UR = {
    預欠收_台幣?: kintone.fieldTypes.Number
    預欠收_美金?: kintone.fieldTypes.Number
  }
  let record: UR = { 預欠收_台幣: { type: 'NUMBER', value: balance } }
  if (currency === '美金') record = { 預欠收_美金: { type: 'NUMBER', value: balance } }

  const res = await req.record.updateRecord({
    app: APP_ID,
    updateKey: {
      field: '病歷號碼',
      value: cn
    },
    record
  })
  console.log(res)

  if (!res.revision) throw new Error('無法更新病患預欠收資料')
  return res
}