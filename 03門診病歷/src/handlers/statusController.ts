import { KintoneTypes } from '../dts/types'

const virtualOpds = ['雲端門診', '特別門診']

const statusController = (event: KintoneTypes.E.Opd) => {
  const record = event.record!
  const status = event.status?.value
  const clinic = record.門診別.value
  const fee = record.應收.value
  
  if (status === '完成') return

  // 完成前若應收不等於0，一率將批價狀態改成「尚未」
  if (fee !== '0') {
    event.record!.批價狀態.value = '尚未'
    return event
  }

  // 虛擬門診時，完成前若應收為0，將批價狀態改成「不需」
  if (virtualOpds.includes(clinic) && fee === '0') {
    event.record!.批價狀態.value = '不需'
    return event
  }

  return event
}

export default statusController