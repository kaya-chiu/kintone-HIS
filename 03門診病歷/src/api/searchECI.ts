import { KintoneRestAPIClient } from '@kintone/rest-api-client'
import config from '../config'

type Params = {
  date: string;
  code: string;
  cn: string;
  input: string | null | undefined
}

const req = new KintoneRestAPIClient({
  auth: { apiToken: import.meta.env.VITE_API_TOKEN_ECI }
})
const APP_ID = 68

const searchECI = async ({ date, code, cn, input } : Params) => {
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

export default searchECI