import { KintoneTypes } from '../dts/types'

const autoLookupPatient = (event: KintoneTypes.E.Appo) => {
  const cn = event.record!.病歷號碼

  // @ts-expect-error: 如果病歷號碼已有值（從動作按鈕建立時），自動進行 Lookup
  if (cn.value) event.record!.病歷號碼.lookup = true
  
  return event
}

export default autoLookupPatient