import { KintoneRestAPIClient } from '@kintone/rest-api-client'

const req = new KintoneRestAPIClient({
  auth: { apiToken: import.meta.env.VITE_API_TOKEN_STA }
})
const APP_ID = 54

type StaffValue = {
  code: string;
  name: string;
}
type StaffList = {
  使用者: {
    type: 'USER_SELECT'
    value: StaffValue[]
  }
}

const getStaff = async () => {
  const res = await req.record.getRecords({
    app: APP_ID,
    fields: ['使用者'],
    query: '在職狀態 in ("在職") order by 英文名'
  })

  return res.records as StaffList[]
}

export default getStaff