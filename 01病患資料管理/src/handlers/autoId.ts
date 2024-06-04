import config from '../config'
import { getLastPatient } from '../api/patient'
import { KintoneTypes } from '../dts/types'


const autoId = async (event: KintoneTypes.E.Patient) => {
  const lastRecord = await getLastPatient(config.fc.patient.病歷號碼)
  const lastId = Number(lastRecord[config.fc.patient.病歷號碼].value)

  const newId = (lastId + 1).toString().padStart(6, '0')
  event.record!.病歷號碼.value = newId

  return event
}

export default autoId