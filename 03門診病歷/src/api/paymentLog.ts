import { KintoneRestAPIClient } from '@kintone/rest-api-client'

type R = {
  病歷記錄流水號: kintone.fieldTypes.SingleLineText,
  病歷號碼: kintone.fieldTypes.SingleLineText
}

const req = new KintoneRestAPIClient({
  auth: { 
    apiToken: [
      import.meta.env.VITE_API_TOKEN_PML,
      import.meta.env.VITE_API_TOKEN_OPD,
      import.meta.env.VITE_API_TOKEN_PAT
    ] 
  }
})
const APP_ID = 61

export const postPaymentLog = async (opdNum: string, cn: string) => {
  const record: R = {
    病歷記錄流水號: { type: 'SINGLE_LINE_TEXT', value: opdNum },
    病歷號碼: { type: 'SINGLE_LINE_TEXT', value: cn }
  }

  const res = await req.record.addRecord({
    app: APP_ID,
    record
  })

  if (!res.id) throw new Error('批價記錄建立失敗')
  return res
}