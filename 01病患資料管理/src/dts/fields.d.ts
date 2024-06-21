declare namespace kintone.types {
  interface Fields {
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
  interface SavedFields extends Fields {
    $id: kintone.fieldTypes.Id;
    $revision: kintone.fieldTypes.Revision;
    更新人: kintone.fieldTypes.Modifier;
    建立人: kintone.fieldTypes.Creator;
    記錄號碼: kintone.fieldTypes.RecordNumber;
    更新時間: kintone.fieldTypes.UpdatedTime;
    建立時間: kintone.fieldTypes.CreatedTime;
  }
}
