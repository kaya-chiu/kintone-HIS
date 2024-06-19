import { KintoneRestAPIClient } from '@kintone/rest-api-client'
// import { KintoneTypes } from '../dts/types'
// import config from '../config'

type Search = {
  medicine: {
    appId: string | number,
    token: string
  },
  treatment: {
    appId: string | number,
    token: string
  },
  examination: {
    appId: string | number,
    token: string
  }
}

const search: Search = {
  medicine: {
    appId: 59,
    token: import.meta.env.VITE_API_TOKEN_MDB
  },
  treatment: {
    appId: '',
    token: ''
  },
  examination: {
    appId: 57,
    token: import.meta.env.VITE_API_TOKEN_EDB
  }
}

export const searchDB = async (db: keyof Search, searchType: string, input: string | number) => {
  const req = new KintoneRestAPIClient({
    auth: { apiToken: search[db].token }
  })

  const res = await req.record.getRecords({
    app: search[db].appId,
    query: `
      ${searchType} like "${input}" and 啟用狀態 in ("啟用")
      order by $id asc
    `
  })

  return res.records
}