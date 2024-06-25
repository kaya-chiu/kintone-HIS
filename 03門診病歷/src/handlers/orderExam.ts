import { getLastBarcode, getLastSerialNum, postECI } from '../api/ECI'
import { KintoneTypes } from '../dts/types'

type Params = {
  cn: string;
  opdId: string;
  rows: KintoneTypes.ExamTable[],
  updateRows: React.Dispatch<React.SetStateAction<KintoneTypes.ExamTable[]>>
}
type Group<T extends string> = {
  [key in T]?: { barcode: string }
}

const generateSerialNum = async (barcode: string) => {
  const lastSerialNum = await getLastSerialNum(barcode)

  // 若無既存序號，則回傳 01
  if (!lastSerialNum) {
    return `${barcode}-01`
  }

  const serialNum = Number(lastSerialNum.split('-')[1])
  const newSerialNum = (serialNum + 1).toString().padStart(2, '0')
  return `${barcode}-${newSerialNum}`
}

const orderExam = async ({ cn, opdId, rows, updateRows } : Params): Promise<{ ok: boolean, err?: string }> => {
  const groupedData: Group<string> = {}

  const rowProcess = async (row: KintoneTypes.ExamTable) => {
    // 將日期和分管組合結合成組別key
    const key = `${row.value.檢驗日期.value}-${row.value.分管組合.value}`
  
    // 若key不存在，則新增key
    if (!(key in groupedData)) {
      // 透過API最後一筆資料的barcode, 若存在則barcode +1，不存在則產生 00000000000001(14碼) 
      const lastBarcode = await getLastBarcode()
      groupedData[key] = {
        barcode: lastBarcode 
          ? (Number(lastBarcode) + 1).toString().padStart(14, '0')
          : '00000000000001'
      }
    }
  
    const barcode = groupedData[key]!.barcode
    const serialNum = await generateSerialNum(barcode)
    const newRecord = {
      cn,
      date: row.value.檢驗日期.value,
      code: row.value.檢驗代碼.value,
      barcode,
      serialNum,
      orderOpdId: opdId
    }
  
    await postECI(newRecord)
    row.value.檢驗單狀態.value = '已開'
    row.value.檢驗單號.value = serialNum
    updateRows(rows)
  }

  try {
    // 要使用 for...of 確保陣列每一行依序執行
    for (const row of rows) {
      await rowProcess(row)
    }
    return { ok: true }
  } catch (err) {
    console.error('Error during processing:', err)
    const errMsg = (err as Error).message || '開立檢驗單時發生錯誤'
    return { ok: false, err: errMsg }
  }
}

export default orderExam