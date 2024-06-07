declare namespace kintone.types {
  interface Fields {
    門診時段: kintone.fieldTypes.DropDown;
    門診別: kintone.fieldTypes.DropDown;
    星期: kintone.fieldTypes.SingleLineText;
    日期: kintone.fieldTypes.Date;
    人數上限: kintone.fieldTypes.Calc;
    代診: kintone.fieldTypes.CheckBox;
    看診醫師: kintone.fieldTypes.UserSelect;
  }
  interface SavedFields extends Fields {
    $id: kintone.fieldTypes.Id;
    $revision: kintone.fieldTypes.Revision;
    更新人: kintone.fieldTypes.Modifier;
    建立人: kintone.fieldTypes.Creator;
    建立時間: kintone.fieldTypes.CreatedTime;
    記錄號碼: kintone.fieldTypes.RecordNumber;
    更新時間: kintone.fieldTypes.UpdatedTime;
  }
}
