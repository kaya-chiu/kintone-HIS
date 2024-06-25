import { KintoneTypes } from '../dts/types'
import { sucToast } from '../utils/myToast'

const mediStatusHandler = (event: KintoneTypes.E.Opd) => {
  const status = event.record!.狀態.value
  const medicine = event.record!.用藥.value
  const hasCheckout = event.record!.批價狀態.value === '完成'
  const isRequired = medicine.length > 0 ? medicine.length > 1 || (medicine.length === 1 && medicine[0].value.藥品代碼.value) : false

  // submit時，若尚未批價且有開藥，將已領藥狀態改成否
  if (event.type.includes('submit')) {
    if (!hasCheckout && isRequired) {
      event.record!.已領藥.value = '否'
      return event
    } else {
      event.record!.已領藥.value = ''
      return event
    }
  }
  
  // 流程在領藥並執行完成領藥之動作時，將已領藥狀態改成是
  if (event.type.includes('proceed') && status === '領藥') {
    event.record!.已領藥.value = '是'
    sucToast('領藥完成', '')
    return event
  }

  return event
}

export default mediStatusHandler