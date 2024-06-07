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
    appo: KintoneTypes.Fc<keyof KintoneTypes.Appo>
    sch: KintoneTypes.Fc<keyof KintoneTypes.Sch>
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
    appo: {
      $id: '$id',
      $revision: '$revision',
      更新人: '更新人',
      建立人: '建立人',
      記錄號碼: '記錄號碼',
      更新時間: '更新時間',
      建立時間: '建立時間',
      看診序號: '看診序號',
      姓名: '姓名',
      身份別: '身份別',
      掛號流水號: '掛號流水號',
      性別: '性別',
      門診表記錄號碼: '門診表記錄號碼',
      掛號狀態: '掛號狀態',
      病歷號碼: '病歷號碼',
      門診時段: '門診時段',
      生日: '生日',
      門診別: '門診別',
      身分證號: '身分證號',
      掛號備註: '掛號備註',
      分區: '分區',
      就診類別: '就診類別',
      療程別: '療程別',
      就診日期: '就診日期',
      看診醫師: '看診醫師',
      主治醫師: '主治醫師',
    },
    sch: {
      $id: '$id',
      $revision: '$revision',
      更新人: '更新人',
      建立人: '建立人',
      記錄號碼: '記錄號碼',
      更新時間: '更新時間',
      建立時間: '建立時間',
      門診時段: '門診時段',
      門診別: '門診別',
      看診醫師: '看診醫師',
      星期: '星期',
      日期: '日期',
      人數上限: '人數上限',
      代診: '代診'
    }
  }
}

export default config