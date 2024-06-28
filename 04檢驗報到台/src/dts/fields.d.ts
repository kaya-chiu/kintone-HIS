declare namespace kintone.types {
  interface Fields {
    password: kintone.fieldTypes.SingleLineText;
    name: kintone.fieldTypes.SingleLineText;
    email: kintone.fieldTypes.SingleLineText;
    hash: kintone.fieldTypes.SingleLineText;
    username: kintone.fieldTypes.SingleLineText;
  }
  interface SavedFields extends Fields {
    $id: kintone.fieldTypes.Id;
    $revision: kintone.fieldTypes.Revision;
    更新人: kintone.fieldTypes.Modifier;
    建立人: kintone.fieldTypes.Creator;
    建立時間: kintone.fieldTypes.CreatedTime;
    更新時間: kintone.fieldTypes.UpdatedTime;
    id: kintone.fieldTypes.RecordNumber;
  }
}
