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

  type Appo = Base & {
    看診序號: KintoneRecordField.SingleLineText;
    姓名: KintoneRecordField.SingleLineText;
    身份別: KintoneRecordField.SingleLineText;
    掛號流水號: KintoneRecordField.SingleLineText;
    性別: KintoneRecordField.SingleLineText;
    門診表記錄號碼: KintoneRecordField.Number;
    掛號狀態: KintoneRecordField.DropDown;
    病歷號碼: KintoneRecordField.SingleLineText;
    門診時段: KintoneRecordField.DropDown;
    生日: KintoneRecordField.Date;
    門診別: KintoneRecordField.DropDown;
    身分證號: KintoneRecordField.SingleLineText;
    掛號備註: KintoneRecordField.SingleLineText;
    分區: KintoneRecordField.SingleLineText;
    就診類別: KintoneRecordField.SingleLineText;
    療程別: KintoneRecordField.SingleLineText;
    就診日期: KintoneRecordField.Date;
    看診醫師: KintoneRecordField.UserSelect;
    主治醫師: KintoneRecordField.UserSelect;
  }

  type Sch = Base & {
    門診時段: KintoneRecordField.DropDown;
    門診別: KintoneRecordField.DropDown;
    星期: KintoneRecordField.SingleLineText;
    日期: KintoneRecordField.Date;
    人數上限: KintoneRecordField.Calc;
    代診: KintoneRecordField.CheckBox;
    看診醫師: KintoneRecordField.UserSelect;
    門診時段編號: KintoneRecordField.SingleLineText;
  }

  type Fc<T extends string> = {
    [key in T]: `${key}`
  }

  namespace E {
    interface Appo {
      type: string,
      record?: KintoneTypes.Appo
      records?: (KintoneTypes.Appo)[],
      error?: string
    }

    interface Sch {
      type: string,
      record?: KintoneTypes.Sch
      records?: (KintoneTypes.Sch)[],
      error?: string
    }
  }
}