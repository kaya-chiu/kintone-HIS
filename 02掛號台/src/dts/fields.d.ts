declare namespace kintone.types {
  interface Fields {
    看診序號: kintone.fieldTypes.SingleLineText;
    姓名: kintone.fieldTypes.SingleLineText;
    身份別: kintone.fieldTypes.SingleLineText;
    掛號流水號: kintone.fieldTypes.SingleLineText;
    性別: kintone.fieldTypes.SingleLineText;
    門診表記錄號碼: kintone.fieldTypes.Number;
    掛號狀態: kintone.fieldTypes.DropDown;
    病歷號碼: kintone.fieldTypes.SingleLineText;
    門診時段: kintone.fieldTypes.DropDown;
    生日: kintone.fieldTypes.Date;
    門診別: kintone.fieldTypes.DropDown;
    身分證號: kintone.fieldTypes.SingleLineText;
    掛號備註: kintone.fieldTypes.SingleLineText;
    分區: kintone.fieldTypes.SingleLineText;
    就診類別: kintone.fieldTypes.SingleLineText;
    療程別: kintone.fieldTypes.SingleLineText;
    就診日期: kintone.fieldTypes.Date;

    看診醫師: kintone.fieldTypes.UserSelect;
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
