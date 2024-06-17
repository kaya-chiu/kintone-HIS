declare namespace kintone.types {
  interface Fields {
    啟用狀態: kintone.fieldTypes.RadioButton;
    參考值上限: kintone.fieldTypes.SingleLineText;
    參考值下限: kintone.fieldTypes.SingleLineText;
    檢驗代碼: kintone.fieldTypes.SingleLineText;
    價格3: kintone.fieldTypes.Number;
    採檢容器種類: kintone.fieldTypes.SingleLineText;
    檢驗數值單位: kintone.fieldTypes.SingleLineText;
    價格1: kintone.fieldTypes.Number;
    價格2: kintone.fieldTypes.Number;
    分管組合名稱: kintone.fieldTypes.SingleLineText;
    檢驗名稱: kintone.fieldTypes.SingleLineText;
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
