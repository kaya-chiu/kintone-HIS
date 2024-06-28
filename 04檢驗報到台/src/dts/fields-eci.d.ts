declare namespace kintone.types {
  interface Fields {
    檢驗單號: kintone.fieldTypes.SingleLineText;
    開單記錄: kintone.fieldTypes.SingleLineText;
    病歷號碼: kintone.fieldTypes.SingleLineText;
    檢驗日期: kintone.fieldTypes.Date;
    生日: kintone.fieldTypes.Date;
    檢驗代碼: kintone.fieldTypes.SingleLineText;
    姓名: kintone.fieldTypes.SingleLineText;
    退單記錄: kintone.fieldTypes.SingleLineText;
    性別: kintone.fieldTypes.SingleLineText;
    條碼號: kintone.fieldTypes.SingleLineText;
    身份證號: kintone.fieldTypes.SingleLineText;
    檢驗名稱: kintone.fieldTypes.SingleLineText;
    主治醫師: kintone.fieldTypes.UserSelect;
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
