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

  type Report = Base & {
    參考值下限: KintoneRecordField.SingleLineText;
    檢驗單號_系統: KintoneRecordField.SingleLineText;
    檢驗結果: KintoneRecordField.SingleLineText;
    姓名: KintoneRecordField.SingleLineText;
    性別: KintoneRecordField.SingleLineText;
    採檢時間: KintoneRecordField.DateTime & { disabled: boolean };
    單位: KintoneRecordField.SingleLineText;
    條碼號: KintoneRecordField.SingleLineText;
    參考值上限: KintoneRecordField.SingleLineText;
    檢驗單號: KintoneRecordField.SingleLineText & { disabled: boolean };
    病歷號碼: KintoneRecordField.SingleLineText & { disabled: boolean };
    生日: KintoneRecordField.Date;
    檢驗代碼: KintoneRecordField.SingleLineText & { disabled: boolean };
    報告時間: KintoneRecordField.DateTime & { disabled: boolean };
    身份證號: KintoneRecordField.SingleLineText;
    檢驗名稱: KintoneRecordField.SingleLineText;
    發報告者: KintoneRecordField.UserSelect & { disabled: boolean };
    單窗: KintoneRecordField.UserSelect;
    主治醫師: KintoneRecordField.UserSelect;
  }

  type Fc<T extends string> = {
    [key in T]: `${key}`
  }

  namespace E {
    interface Report {
      type: string,
      record?: KintoneTypes.Report
      records?: (KintoneTypes.Report)[]
      action?: { value: string },
      error?: string
    }
  }
}