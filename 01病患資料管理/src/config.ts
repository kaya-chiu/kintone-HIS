type FieldCodes<T extends string> = {
  [key in T]: `${key}`
}
interface Config {
  patient: {
    appId: number,
    field: FieldCodes<keyof KintoneTypes.Patient>
  }
}

const config: Config = {
  patient: {
    appId: 51,
    field: {
      $id: '$id',
      $revision: '$revision',
      更新人: '更新人',
      建立人: '建立人',
      記錄號碼: '記錄號碼',
      更新時間: '更新時間',
      建立時間: '建立時間',
      Email: 'Email',
      懷孕史: '懷孕史',
      藥物過敏史: '藥物過敏史',
      姓名: '姓名',
      身份別: '身份別',
      其他病史: '其他病史',
      性別: '性別',
      身高: '身高',
      聯絡地址: '聯絡地址',
      年齡: '年齡',
      病歷號碼: '病歷號碼',
      預欠收_台幣: '預欠收_台幣',
      生日: '生日',
      電話號碼: '電話號碼',
      預欠收_美金: '預欠收_美金',
      體重: '體重',
      分區: '分區',
      特別記載: '特別記載',
      療程別: '療程別',
      身份證號: '身份證號',
      IVF往例: 'IVF往例',
      單窗: '單窗',
      主治醫師: '主治醫師'
    }
  }
}

export default config