import Swal from 'sweetalert2'
import { getOpdRecordId, postOpdRecord, putOpdStatus } from '../api/opd'
import { KintoneTypes } from '../dts/types'

const opds = {
  normal: ['一診', '二診'],
  blood: ['抽血門診'],
  virtual: ['雲端門診', '特別門診']
}

const openNewTab = (id: number | string) => {
  const url = `https://kaya.cybozu.com/k/55/show#record=${id}&mode=edit`
  const newTab = window.open(url, '_blank')
  newTab?.location
}

const checkin = async (event: KintoneTypes.E.Appo) => {
  try {
    const record = event.record!
    const action = event.action!.value
    const clinic = record.門診別.value

    // @ts-expect-error: 門診病歷 新記錄內容
    const newOpdRecord: KintoneTypes.Opd = {
      病歷號碼: record.病歷號碼,
      掛號流水號: record.掛號流水號,
      就診類別: record.就診類別,
      身份別: record.身份別,
      Subjective: {
        value: record.掛號備註.value
      }
    }
    
    // 特別門診、雲端門診報到時，建立新門診記錄並開啟編輯頁面
    if (opds.virtual.includes(clinic)) {
      const res = await postOpdRecord(newOpdRecord)
      openNewTab(res.id)
      return event
    }

    // 抽血門診
    else if (opds.blood.includes(clinic)) {
      // 流程動作為「預開抽血單」時，建立新門診記錄並開啟編輯頁面
      if (action === '預開抽血單') {
        const res = await postOpdRecord(newOpdRecord)
        openNewTab(res.id)
        return event
      }
      // 流程動作為「報到：批價」時，將對應門診記錄執行流程動作「批價」
      else if (action === '報到：批價') {
        const opdRecordId = await getOpdRecordId(record.掛號流水號.value)          
        await putOpdStatus(opdRecordId, '批價')
        openNewTab(opdRecordId)
        return event
      }
      // 無對應流程時的錯誤處理
      else {
        throw new Error(`無對應流程「${action}」，請確認客製化程式`)
      }
    }

    // 一般門診（一診、二診）
    else if (opds.normal.includes(clinic)) {
      console.log('一般門診報到')
      // 流程動作為「報到」時，建立新門診記錄，並執行流程動作「諮詢區準備」
      if (action === '報到') {
        const res = await postOpdRecord(newOpdRecord)
        await putOpdStatus(res.id, '諮詢區準備')
        return event
      }
      // 流程動作為「報到：先抽血」時，建立新門診記錄，並執行流程動作「先抽血」
      else if (action === '報到：先抽血') {
        const res = await postOpdRecord(newOpdRecord)
        await putOpdStatus(res.id, '先抽血')
        return event
      }
      // 流程動作為「報到：先SONA」時，建立新門診記錄，並執行流程動作「先SONA」
      else if (action === '報到：先SONA') {
        const res = await postOpdRecord(newOpdRecord)
        await putOpdStatus(res.id, '先SONA')
        return event
      }
      // 流程動作為「預約未到」時，不建立門診記錄
      else if (action === '預約未到') {
        const result = await Swal.fire({
          title: '確定未到？',
          text: '狀態更改後將無法復原',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '確定未到',
          cancelButtonText: '取消'
        })

        if (result.isConfirmed) {
          return event
        } else {
          event.error = '已取消動作'
          return event
        }
      }
      // 無對應流程時的錯誤處理
      else {
        throw new Error(`無對應流程「${action}」，請確認客製化程式`)
      }
    }

    // 無對應門診別時的錯誤處理
    else {
      throw new Error(`無對應門診別「${clinic}」，請確認客製化程式`)
    }    

  } catch (err) {
    console.error(err)
    // @ts-expect-error: show error message
    event.error = err?.message || 'error'
    return event
  }  
}

export default checkin