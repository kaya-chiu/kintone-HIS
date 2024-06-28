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
    show: string[],
    process: {
      proceed: string[]
    }
  },
  fc: {
    eci: KintoneTypes.Fc<keyof KintoneTypes.ECI>
  },
  // sp: {
  // }
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
    ],
    process: {
      proceed: [
        'app.record.detail.process.proceed',
        'mobile.app.record.detail.process.proceed'
      ]
    }
  },
  fc: {
    eci: {
      $id: '$id',
      $revision: '$revision',
      更新人: '更新人',
      建立人: '建立人',
      記錄號碼: '記錄號碼',
      更新時間: '更新時間',
      建立時間: '建立時間',
      檢驗單號: '檢驗單號',
      開單記錄: '開單記錄',
      病歷號碼: '病歷號碼',
      檢驗日期: '檢驗日期',
      生日: '生日',
      檢驗代碼: '檢驗代碼',
      姓名: '姓名',
      退單記錄: '退單記錄',
      性別: '性別',
      條碼號: '條碼號',
      身份證號: '身份證號',
      檢驗名稱: '檢驗名稱',
      主治醫師: '主治醫師',
      狀態: '狀態',
      分管組合: '分管組合'
    }
  }
}

export default config