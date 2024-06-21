import { getPatientBalance, putPatientBalance } from '../api/patient'
import { postPaymentLog } from '../api/paymentLog'
import { KintoneTypes } from '../dts/types'
import { errToast, sucToast } from '../utils/myToast'

type Currency = '台幣' | '美金'

const virtualOpds = ['雲端門診', '特別門診']
const hasCheckout = ['完成', '領藥', '抽血']

const payStatusHandler = async (event: KintoneTypes.E.Opd) => {
  const record = event.record!
  const status = record.狀態.value
  const action = event.action?.value
  const clinic = record.門診別.value
  const fee = record.應收.value
  
  if (status === '完成') return event

  // submit
  if (event.type.includes('submit')) {
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
  }
  
  // proceed
  if (event.type.includes('proceed')) {
    // 狀態為批價，並且選擇符合批價完成之動作時，更新病患資料預欠收＆修改門診病歷批價狀態
    if (event.status!.value === '批價' && hasCheckout.includes(action!)) {
      try {
        const opdNum = record.病歷記錄流水號.value
        const cn = record.病歷號碼.value
        const updatedBalance = record.結餘.value
        const currency = record.批價幣別.value
        
        // 檢查預欠收款是否與病患資料相符
        const balanceData = await getPatientBalance(cn)
        const balance = balanceData[currency as Currency] as string
        if (record.預欠收.value !== balance) {
          throw new Error('預欠收不符，請重新取得')
        }
        // 建立批價記錄
        await postPaymentLog(opdNum, cn)
        // 更新病患資料預欠收
        await putPatientBalance(cn, updatedBalance, currency)

        // 更新批價狀態
        event.record!.批價狀態.value = '完成'
        sucToast('批價完成', '')
        return event

      } catch (err) {
        console.error(err)
        const errMsg = (err as Error).message || ''
        errToast('錯誤', errMsg)
        return false
      }
    }
  }
}

export default payStatusHandler