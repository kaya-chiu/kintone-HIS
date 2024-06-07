import { fetchCurrentDate } from '../api/time'
import { KintoneTypes } from '../dts/types'

const checkList = ['一診', '二診']

const dateCheck = async (event: KintoneTypes.E.Appo) => {
  const clinic = event.record!.門診別.value!

  if (!checkList.includes(clinic)) return event

  const today = await fetchCurrentDate()
  const appoDateString = event.record!.就診日期.value!
  const appoDate = new Date(appoDateString).toISOString()

  if(appoDate < today) {
    event.error = '預約日期已過！'
    return event
  }

  return event
}

export default dateCheck