/// <reference types="vite/client" />
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
    Email: kintone.fieldTypes.SingleLineText;
    懷孕史: kintone.fieldTypes.SingleLineText;
    藥物過敏史: kintone.fieldTypes.SingleLineText;
    姓名: kintone.fieldTypes.SingleLineText;
    身份別: kintone.fieldTypes.SingleLineText;
    其他病史: kintone.fieldTypes.MultiLineText;
    性別: kintone.fieldTypes.RadioButton;
    身高: kintone.fieldTypes.Number;
    聯絡地址: kintone.fieldTypes.SingleLineText;
    年齡: kintone.fieldTypes.Number;
    病歷號碼: kintone.fieldTypes.SingleLineText;
    預欠收_台幣: kintone.fieldTypes.Number;
    生日: kintone.fieldTypes.Date;
    電話號碼: kintone.fieldTypes.SingleLineText;
    預欠收_美金: kintone.fieldTypes.Number;
    體重: kintone.fieldTypes.Number;
    分區: kintone.fieldTypes.DropDown;
    特別記載: kintone.fieldTypes.MultiLineText;
    療程別: kintone.fieldTypes.DropDown;
    身份證號: kintone.fieldTypes.SingleLineText;
    IVF往例: kintone.fieldTypes.MultiLineText;
    單窗: kintone.fieldTypes.UserSelect;
    主治醫師: kintone.fieldTypes.UserSelect;
  }

  type Related = {
    檢驗報告?: undefined;
    門診病歷?: undefined;
    批價記錄?: undefined;
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