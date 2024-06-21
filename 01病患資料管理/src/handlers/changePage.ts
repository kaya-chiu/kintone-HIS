import { hideField, isMobile, showField } from 'kchelper'
import { Pages } from '../components/DetailTab'
import { KintoneTypes } from '../dts/types'

type Patient = KintoneTypes.Patient & KintoneTypes.Related
type PageFields<T extends string> = {
  [key in T]: (keyof Patient)[]
}

const changePage = (event: KintoneTypes.E.Patient, page: Pages) => {
  const mobile = isMobile(event)
  
  const pages: Pages[] = ['基本資料', '過往病史', '門診病歷', '檢驗報告', '批價記錄']
  const pageFields: PageFields<Pages> = {
    基本資料: [
      '電話號碼', 'Email', '聯絡地址', '藥物過敏史',
      '特別記載', '單窗', '身高', '體重',
    ],
    過往病史: [
      '懷孕史', 'IVF往例', '其他病史'
    ],
    檢驗報告: ['檢驗報告'],
    門診病歷: ['門診病歷'],
    批價記錄: ['預欠收_台幣', '預欠收_美金', '批價記錄']
  }

  pages.forEach(p => {
    if (p === page) {
      pageFields[p].forEach(fc => showField(fc, mobile))
    } else {
      pageFields[p].forEach(fc => hideField(fc, mobile))
    }
  })

  return event
}

export default changePage