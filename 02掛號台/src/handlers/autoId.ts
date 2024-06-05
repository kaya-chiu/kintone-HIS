import { getLastAppo } from '../api/appo'
import { KintoneTypes } from '../dts/types'
import kchelper from 'kchelper'

const generateId = (lastRecord: KintoneTypes.Appo, prefix: string) => {
  if (!lastRecord) return prefix + '01'

  const lastId = Number(lastRecord.掛號流水號.value)
  const newId = (lastId + 1).toString()
  return newId
}

const autoId = async (event: KintoneTypes.E.Appo) => {
  const record = event.record!
  const cn = record.病歷號碼.value!
  const appoDate = record.就診日期.value!

  const dateString = kchelper.getDateString('yymmdd', new Date(appoDate))
  const prefix = dateString + cn
  const lastRecord = await getLastAppo(appoDate, cn)
  const id = generateId(lastRecord, prefix)
  
  record.掛號流水號.value = id
  
  return event
}

export default autoId