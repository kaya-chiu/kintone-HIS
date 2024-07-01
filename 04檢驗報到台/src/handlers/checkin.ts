import { putEciStatus } from '../api/eci'
import { postReport } from '../api/report'
import { DataType } from '../components/ExamTable'
import { errToast, sucToast } from '../utils/myToast'

export const handleCheckin = async (rows: DataType[]) => {
  try {
    await postReport(rows)
    await putEciStatus(rows)
    sucToast('檢驗報到成功', '')
  } catch (err) {
    errToast('報到失敗', err as string)
  }
  
}

export const handleReBarcode = async (rows: DataType[]) => {
  console.log('re-barcode:', rows)
}