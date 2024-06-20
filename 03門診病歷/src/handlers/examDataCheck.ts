import { KintoneTypes } from '../dts/types'
import { errToast } from '../utils/myToast'

const examDataCheck = (event: KintoneTypes.E.Opd) => {
  const table = event.record?.檢驗.value
  try {
    table?.forEach((row, index) => {
      if (row.value.檢驗單狀態.value === '退單') {
        if (!row.value.檢驗單號.value || row.value.檢驗單號.value.length === 0) {
          errToast('錯誤：退單時必須選擇檢驗單號', `請檢查檢驗項目第${index + 1}行`)
          throw new Error('退單時必須選擇檢驗單號')
        }
      }
    })
    return event
  } catch (err) {
    console.error(err)
    return false
  }
}

export default examDataCheck