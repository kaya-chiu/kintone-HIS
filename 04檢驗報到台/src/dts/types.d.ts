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

  type ECI = Base & {
    檢驗單號: KintoneRecordField.SingleLineText;
    開單記錄: KintoneRecordField.SingleLineText;
    病歷號碼: KintoneRecordField.SingleLineText;
    檢驗日期: KintoneRecordField.Date;
    生日: KintoneRecordField.Date;
    檢驗代碼: KintoneRecordField.SingleLineText;
    姓名: KintoneRecordField.SingleLineText;
    退單記錄: KintoneRecordField.SingleLineText;
    性別: KintoneRecordField.SingleLineText;
    條碼號: KintoneRecordField.SingleLineText;
    身份證號: KintoneRecordField.SingleLineText;
    檢驗名稱: KintoneRecordField.SingleLineText;
    主治醫師: KintoneRecordField.UserSelect;
    分管組合: KintoneRecordField.SingleLineText;
    狀態: {
      type: 'STATUS',
      value: string | null | undefined
    }
  }

  type Report = Base & {
    參考值下限: kintone.fieldTypes.SingleLineText;
    檢驗結果: kintone.fieldTypes.SingleLineText;
    姓名: kintone.fieldTypes.SingleLineText;
    性別: kintone.fieldTypes.SingleLineText;
    採檢時間: kintone.fieldTypes.DateTime;
    單位: kintone.fieldTypes.SingleLineText;
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

  type Fc<T extends string> = {
    [key in T]: `${key}`
  }

  namespace E {
    interface ECI {
      type: string,
      record?: KintoneTypes.ECI
      records?: (KintoneTypes.ECI)[]
    }
  }
}