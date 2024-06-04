import type { KintoneRecordField } from '@kintone/rest-api-client'

declare namespace KintoneTypes {
  type Base = {
    $id: KintoneRecordField.Id;
    $revision: KintoneRecordField.Revision;
    更新人: KintoneRecordField.Modifier;
    建立人: KintoneRecordField.Creator;
    記錄號碼: KintoneRecordField.RecordNumber;
    更新時間: KintoneRecordField.UpdatedTime;
    建立時間: KintoneRecordField.CreatedTime;
  }

  // 【HIS】01 病患資料管理
  // https://kaya.cybozu.com/k/51/
  type Patient = Base & {
    Email: KintoneRecordField.SingleLineText;
    懷孕史: KintoneRecordField.SingleLineText;
    藥物過敏史: KintoneRecordField.SingleLineText;
    姓名: KintoneRecordField.SingleLineText;
    身份別: KintoneRecordField.SingleLineText;
    其他病史: KintoneRecordField.MultiLineText;
    性別: KintoneRecordField.RadioButton;
    身高: KintoneRecordField.Number;
    聯絡地址: KintoneRecordField.SingleLineText;
    年齡: KintoneRecordField.Number;
    病歷號碼: KintoneRecordField.SingleLineText;
    預欠收_台幣: KintoneRecordField.Number;
    生日: KintoneRecordField.Date;
    電話號碼: KintoneRecordField.SingleLineText;
    預欠收_美金: KintoneRecordField.Number;
    體重: KintoneRecordField.Number;
    分區: KintoneRecordField.DropDown;
    特別記載: KintoneRecordField.MultiLineText;
    療程別: KintoneRecordField.DropDown;
    身份證號: KintoneRecordField.SingleLineText;
    IVF往例: KintoneRecordField.MultiLineText;
    單窗: KintoneRecordField.UserSelect;
    主治醫師: KintoneRecordField.UserSelect;
  }

  type Fc<T extends string> = {
    [key in T]: `${key}`
  }

  namespace E {
    interface Patient {
      type: string,
      record?: KintoneTypes.Patient
      records?: (KintoneTypes.Patient)[]
    }
  }
}