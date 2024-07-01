declare namespace kintone.types {
  interface Fields {
    參考值下限: kintone.fieldTypes.SingleLineText;
    檢驗單號_系統: kintone.fieldTypes.SingleLineText;
    檢驗結果: kintone.fieldTypes.SingleLineText;
    姓名: kintone.fieldTypes.SingleLineText;
    性別: kintone.fieldTypes.SingleLineText;
    採檢時間: kintone.fieldTypes.DateTime;
    單位: kintone.fieldTypes.SingleLineText;
    條碼號: kintone.fieldTypes.SingleLineText;
    參考值上限: kintone.fieldTypes.SingleLineText;
    檢驗單號: kintone.fieldTypes.SingleLineText;
    病歷號碼: kintone.fieldTypes.SingleLineText;
    生日: kintone.fieldTypes.Date;
    檢驗代碼: kintone.fieldTypes.SingleLineText;
    報告時間: kintone.fieldTypes.DateTime;
    身份證號: kintone.fieldTypes.SingleLineText;
    檢驗名稱: kintone.fieldTypes.SingleLineText;

    發報告者: kintone.fieldTypes.UserSelect;
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
