declare namespace kintone.types {
  interface Fields {
    啟用狀態: kintone.fieldTypes.RadioButton;
    藥品名稱: kintone.fieldTypes.SingleLineText;
    預設劑量: kintone.fieldTypes.Number;
    價格3: kintone.fieldTypes.Number;
    預設頻率: kintone.fieldTypes.DropDown;
    價格1: kintone.fieldTypes.Number;
    價格2: kintone.fieldTypes.Number;
    藥品項目代碼: kintone.fieldTypes.SingleLineText;
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
