import { Pages } from '../components/DetailTab'
import config from '../config'
import { KintoneTypes } from '../dts/types'
import kchelper from 'kchelper'

type PageFields<T extends string> = {
  [key in T]: (keyof KintoneTypes.Patient)[]
}

const changePage = (event: KintoneTypes.E.Patient, page: Pages) => {
  const isMobile = kchelper.isMobile(event)

  const examinationEl: HTMLElement = document.querySelector(config.el.examinationEl)!
  const accountGroupEl: HTMLElement = document.querySelector(config.el.accountGroupEl)!
  
  const pageFields: PageFields<Pages> = {
    基本資料: [
      '電話號碼', 'Email', '聯絡地址', '藥物過敏史',
      '特別記載', '單窗', '預欠收_台幣', '預欠收_美金'
    ],
    病歷首頁: [
      '身高', '體重', '懷孕史', 'IVF往例', '其他病史'
    ],
    檢驗報告: []
  }

  switch (page) {
  case '基本資料':
    pageFields.基本資料.forEach(fc => kchelper.showField(fc, isMobile))
    pageFields.病歷首頁.forEach(fc => kchelper.hideField(fc, isMobile))
    if (accountGroupEl) accountGroupEl.style.display = 'block'
    if (examinationEl) examinationEl.style.display = 'none'
    break
  case '病歷首頁':
    pageFields.基本資料.forEach(fc => kchelper.hideField(fc, isMobile))
    pageFields.病歷首頁.forEach(fc => kchelper.showField(fc, isMobile))
    if (accountGroupEl) accountGroupEl.style.display = 'none'
    if (examinationEl) examinationEl.style.display = 'none'
    break
  case '檢驗報告':
    pageFields.病歷首頁.forEach(fc => kchelper.hideField(fc, isMobile))
    pageFields.基本資料.forEach(fc => kchelper.hideField(fc, isMobile))
    if (accountGroupEl) accountGroupEl.style.display = 'none'
    if (examinationEl) examinationEl.style.display = 'block'
    break
  default:
    break
  }

  return event
}

export default changePage