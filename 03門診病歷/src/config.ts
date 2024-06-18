import { KintoneTypes } from './dts/types'

interface Editable {
  show: string[],
  submit: string[],
  success: string[]
}
interface Config {
  events: {
    create: Editable,
    edit: Editable,
    all: Editable,
    show: string[]
  },
  fc: {
    opd: KintoneTypes.Fc<keyof KintoneTypes.Opd>,
    exam: KintoneTypes.Fc<keyof KintoneTypes.ExamField>,
    eci: KintoneTypes.Fc<keyof KintoneTypes.ECI>
  },
  sp: {
    medicineSearch: string,
    treatmentSearch: string,
    examinationSearch: string,
    exam: string
  },
  el: {
    spacer: string
  }
}

const config: Config = {
  events: {
    create: {
      show: [
        'app.record.create.show',
        'mobile.app.record.create.show',
      ],
      submit: [
        'app.record.create.submit',
        'mobile.app.record.create.submit',
      ],
      success: [
        'app.record.create.submit.success',
        'mobile.app.record.create.submit.success',
      ]
    },
    edit: {
      show: [
        'app.record.edit.show',
        'app.record.index.edit.show',
        'mobile.app.record.edit.show',
      ],
      submit: [
        'app.record.edit.submit',
        'app.record.index.edit.submit',
        'mobile.app.record.edit.submit',
      ],
      success: [
        'app.record.edit.submit.success',
        'app.record.index.edit.submit.success',
        'mobile.app.record.edit.submit.success',
      ]
    },
    all: {
      show: [
        'app.record.create.show',
        'mobile.app.record.create.show',
        'app.record.edit.show',
        'app.record.index.edit.show',
        'mobile.app.record.edit.show',
      ],
      submit: [
        'app.record.create.submit',
        'mobile.app.record.create.submit',
        'app.record.edit.submit',
        'app.record.index.edit.submit',
        'mobile.app.record.edit.submit',
      ],
      success: [
        'app.record.create.submit.success',
        'mobile.app.record.create.submit.success',
        'app.record.edit.submit.success',
        'app.record.index.edit.submit.success',
        'mobile.app.record.edit.submit.success',
      ]
    },
    show: [
      'app.record.detail.show',
      'mobile.app.detail.show',
      'app.record.index.show',
      'mobile.app.record.index.show',
    ]
  },
  fc: {
    opd: {
      $id: '$id',
      $revision: '$revision',
      更新人: '更新人',
      建立人: '建立人',
      記錄號碼: '記錄號碼',
      更新時間: '更新時間',
      建立時間: '建立時間',
      預設劑量: '預設劑量',
      檢驗價格3: '檢驗價格3',
      姓名: '姓名',
      檢驗價格2: '檢驗價格2',
      檢驗價格1: '檢驗價格1',
      身份別: '身份別',
      實收: '實收',
      藥品名稱搜尋: '藥品名稱搜尋',
      藥品價格3: '藥品價格3',
      病歷號碼: '病歷號碼',
      批價代碼: '批價代碼',
      藥品價格1: '藥品價格1',
      藥品價格2: '藥品價格2',
      生日: '生日',
      批價狀態: '批價狀態',
      預設頻率: '預設頻率',
      藥品代碼搜尋: '藥品代碼搜尋',
      Objective: 'Objective',
      檢驗名稱搜尋: '檢驗名稱搜尋',
      批價幣別: '批價幣別',
      就診日期: '就診日期',
      掛號費_台幣: '掛號費_台幣',
      已領藥: '已領藥',
      看診序號: '看診序號',
      掛號流水號: '掛號流水號',
      性別: '性別',
      處置名稱搜尋: '處置名稱搜尋',
      檢驗代碼搜尋: '檢驗代碼搜尋',
      門診時段: '門診時段',
      門診別: '門診別',
      Subjective: 'Subjective',
      預欠收: '預欠收',
      處置價格1: '處置價格1',
      分區: '分區',
      處置價格3: '處置價格3',
      就診類別: '就診類別',
      處置價格2: '處置價格2',
      處置代碼搜尋: '處置代碼搜尋',
      療程別: '療程別',
      病歷記錄流水號: '病歷記錄流水號',
      身份證號: '身份證號',
      掛號費_美金: '掛號費_美金',
      預設天數: '預設天數',
      應收: '應收',
      掛號費: '掛號費',
      對應藥品價格: '對應藥品價格',
      處置費: '處置費',
      對應檢驗價格: '對應檢驗價格',
      對應處置價格: '對應處置價格',
      檢驗費: '檢驗費',
      結餘: '結餘',
      就診時年齡: '就診時年齡',
      藥費: '藥費',
      關聯者: '關聯者',
      看診醫師: '看診醫師',
      單窗: '單窗',
      主治醫師: '主治醫師',
      處置: '處置',
      用藥: '用藥',
      檢驗: '檢驗'
    },
    exam: {
      檢驗備註: '檢驗備註',
      檢驗單號: '檢驗單號',
      成數_檢驗: '成數_檢驗',
      檢驗日期: '檢驗日期',
      檢驗單價: '檢驗單價',
      分管組合: '分管組合',
      檢驗代碼: '檢驗代碼',
      檢驗單狀態: '檢驗單狀態',
      檢驗名稱: '檢驗名稱',
      檢驗費小計: '檢驗費小計'
    },
    eci: {
      $id: '$id',
      $revision: '$revision',
      更新人: '更新人',
      建立人: '建立人',
      記錄號碼: '記錄號碼',
      更新時間: '更新時間',
      建立時間: '建立時間',
      姓名: '姓名',
      病歷號碼: '病歷號碼',
      生日: '生日',
      性別: '性別',
      身份證號: '身份證號',
      主治醫師: '主治醫師',
      檢驗日期: '檢驗日期',
      檢驗代碼: '檢驗代碼',
      檢驗名稱: '檢驗名稱',
      檢驗單號: '檢驗單號',
      退單記錄: '退單記錄',
      條碼號: '條碼號',
      關聯病歷記錄: '關聯病歷記錄',
      狀態: '狀態'
    }
  },
  sp: {
    medicineSearch: 'medicine-search',
    treatmentSearch: 'treatment-search',
    examinationSearch: 'examination-search',
    exam: 'examination'
  },
  el: {
    spacer: '.control-spacer-field-gaia'
  }
}

export default config