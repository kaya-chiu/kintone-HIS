import { KintoneRestAPIClient } from '@kintone/rest-api-client'
import config from '../config'
import { KintoneTypes } from '../dts/types'

type Params = {
  date: string;
  code: string;
  cn: string;
  input: string | null | undefined
}

type R = {
  檢驗單號: kintone.fieldTypes.SingleLineText;
  病歷號碼: kintone.fieldTypes.SingleLineText;
  檢驗日期: kintone.fieldTypes.Date;
  檢驗代碼: kintone.fieldTypes.SingleLineText;
  開單記錄?: kintone.fieldTypes.SingleLineText;
  退單記錄?: kintone.fieldTypes.SingleLineText;
  條碼號: kintone.fieldTypes.SingleLineText;
}

type Post = {
  cn: string,
  date: string,
  code: string,
  barcode: string,
  serialNum: string,
  orderOpdId?: string,
  cancelOpdId?: string
}

const req = new KintoneRestAPIClient({
  auth: {
    apiToken: [
      import.meta.env.VITE_API_TOKEN_ECI,
      import.meta.env.VITE_API_TOKEN_PAT,
      import.meta.env.VITE_API_TOKEN_OPD,
      import.meta.env.VITE_API_TOKEN_EDB
    ]
  }
})
const APP_ID = 68

export const searchECI = async ({ date, code, cn, input } : Params) => {
  let query = `
    ${config.fc.eci.檢驗日期} = "${date}"
    and ${config.fc.eci.檢驗代碼} = "${code}"
    and ${config.fc.eci.病歷號碼} = "${cn}"
    and ${config.fc.eci.狀態} = "已開單"
    order by ${config.fc.eci.檢驗名稱}
  `
  if (input) {
    query = `
    ${config.fc.eci.檢驗日期} = "${date}"
    and ${config.fc.eci.檢驗代碼} = "${code}"
    and ${config.fc.eci.病歷號碼} = "${cn}"
    and ${config.fc.eci.狀態} = "已開單"
    and ${config.fc.eci.檢驗單號} like "${input}"
    order by ${config.fc.eci.檢驗名稱}
  `
  }

  const res = await req.record.getRecords({
    app: APP_ID,
    query
  })

  return (res.records)
}

export const getLastBarcode = async () => {
  const res = await req.record.getRecords({
    app: APP_ID,
    query:`order by ${config.fc.eci.條碼號} desc limit 1`
  })

  // 若無資料，回傳 null
  if (res.records.length === 0) {
    return null
  }

  const record = res.records[0] as KintoneTypes.ECI
  return record.條碼號.value
}

export const getLastSerialNum = async (barcode: string) => {
  const res = await req.record.getRecords({
    app: APP_ID,
    query: `
      ${config.fc.eci.條碼號} = "${barcode}"
      order by ${config.fc.eci.檢驗單號} desc limit 1
    `
  })

  // 若無資料，回傳 null
  if (res.records.length === 0) {
    return null
  }

  const record = res.records[0] as KintoneTypes.ECI
  return record.檢驗單號.value
}

export const postECI = async ({ cn, date, code, barcode, serialNum, orderOpdId } : Post) => {
  const record: R = {
    檢驗單號: { type: 'SINGLE_LINE_TEXT', value: serialNum },
    病歷號碼: { type: 'SINGLE_LINE_TEXT', value: cn },
    檢驗日期: { type: 'DATE', value: date },
    檢驗代碼: { type: 'SINGLE_LINE_TEXT', value: code },
    開單記錄: { type: 'SINGLE_LINE_TEXT', value: orderOpdId! },
    條碼號: { type: 'SINGLE_LINE_TEXT', value: barcode }
  }

  const res = await req.record.addRecord({
    app: APP_ID,
    record
  })

  if (!res.id) throw new Error('抽血單建立失敗')
  return res
}