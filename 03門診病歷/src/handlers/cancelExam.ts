import { cancelECI } from '../api/ECI'
import { putOpdExamCancel } from '../api/opd'
import { KintoneTypes } from '../dts/types'

type Params = {
  opdNum: string;
  exam: KintoneTypes.ExamTable[]
}
type Return = {
  ok: boolean;
  exam?: KintoneTypes.ExamTable[];
  err?: string;
}

const cancelExam = async ({ opdNum, exam } : Params): Promise<Return> => {
  const rows = exam.filter(r => r.value.檢驗單狀態.value === '退單' && r.value.檢驗單號.value)
  if (rows.length === 0) return { ok: true }

  try {
    for (const row of rows) {
      const serialNum = row.value.檢驗單號.value
      const { orderedOpdNum } = await cancelECI({ serialNum, cancelOpdNum: opdNum })
      const { sameOpdRecord } = await putOpdExamCancel({ opdNum: orderedOpdNum, serialNum, cancelFrom: opdNum })
      
      // 開單與退單是同一筆門診病歷時，在此更新被退項目的狀態為取消
      if (sameOpdRecord) {
        exam.forEach(r => {
          if (r.value.檢驗單號.value === serialNum && r.value.檢驗單狀態.value === '已開') {
            r.value.檢驗單狀態.value = '取消'
          }
        })
      }

      row.value.檢驗單狀態.value = '已退'
    }
    return { ok: true, exam }
  } catch (err) {
    console.error('cancelExam:', err)
    const errMsg = (err as Error).message || '檢驗退單時發生錯誤'
    return { ok: false, err: errMsg }
  }
}

export default cancelExam
