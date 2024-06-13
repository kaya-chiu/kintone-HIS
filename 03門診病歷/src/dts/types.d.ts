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

  type Opd = Base & {
    預設劑量: kintone.fieldTypes.Number;
    分管組合搜尋: kintone.fieldTypes.SingleLineText;
    檢驗價格3: kintone.fieldTypes.Number;
    姓名: kintone.fieldTypes.SingleLineText;
    檢驗價格2: kintone.fieldTypes.Number;
    檢驗價格1: kintone.fieldTypes.Number;
    身份別: kintone.fieldTypes.SingleLineText;
    實收: kintone.fieldTypes.Number;
    藥品名稱搜尋: kintone.fieldTypes.SingleLineText;
    藥品價格3: kintone.fieldTypes.Number;
    病歷號碼: kintone.fieldTypes.SingleLineText;
    批價代碼: kintone.fieldTypes.Number;
    藥品價格1: kintone.fieldTypes.Number;
    藥品價格2: kintone.fieldTypes.Number;
    生日: kintone.fieldTypes.Date;
    批價狀態: kintone.fieldTypes.DropDown;
    預設頻率: kintone.fieldTypes.SingleLineText;
    藥品代碼搜尋: kintone.fieldTypes.SingleLineText;
    Objective: kintone.fieldTypes.MultiLineText;
    檢驗名稱搜尋: kintone.fieldTypes.SingleLineText;
    批價幣別: kintone.fieldTypes.SingleLineText;
    就診日期: kintone.fieldTypes.Date;
    掛號費_台幣: kintone.fieldTypes.Number;
    已領藥: kintone.fieldTypes.DropDown;
    看診序號: kintone.fieldTypes.SingleLineText;
    掛號流水號: kintone.fieldTypes.SingleLineText;
    性別: kintone.fieldTypes.SingleLineText;
    處置名稱搜尋: kintone.fieldTypes.SingleLineText;
    檢驗代碼搜尋: kintone.fieldTypes.SingleLineText;
    門診時段: kintone.fieldTypes.SingleLineText;
    門診別: kintone.fieldTypes.DropDown;
    Subjective: kintone.fieldTypes.MultiLineText;
    預欠收: kintone.fieldTypes.Number;
    處置價格1: kintone.fieldTypes.Number;
    分區: kintone.fieldTypes.SingleLineText;
    處置價格3: kintone.fieldTypes.Number;
    就診類別: kintone.fieldTypes.SingleLineText;
    處置價格2: kintone.fieldTypes.Number;
    處置代碼搜尋: kintone.fieldTypes.SingleLineText;
    療程別: kintone.fieldTypes.SingleLineText;
    病歷記錄流水號: kintone.fieldTypes.SingleLineText;
    身份證號: kintone.fieldTypes.SingleLineText;
    掛號費_美金: kintone.fieldTypes.Number;
    預設天數: kintone.fieldTypes.Number;
    應收: kintone.fieldTypes.Calc;
    掛號費: kintone.fieldTypes.Calc;
    對應藥品價格: kintone.fieldTypes.Calc;
    處置費: kintone.fieldTypes.Calc;
    對應檢驗價格: kintone.fieldTypes.Calc;
    對應處置價格: kintone.fieldTypes.Calc;
    檢驗費: kintone.fieldTypes.Calc;
    結餘: kintone.fieldTypes.Calc;
    就診時年齡: kintone.fieldTypes.Calc;
    藥費: kintone.fieldTypes.Calc;

    關聯者: kintone.fieldTypes.UserSelect;
    看診醫師: kintone.fieldTypes.UserSelect;
    單窗: kintone.fieldTypes.UserSelect;
    主治醫師: kintone.fieldTypes.UserSelect;
    處置: {
      type: 'SUBTABLE'
      value: Array<{
        id: string;
        value: {
          處置備註: kintone.fieldTypes.SingleLineText;
          成數_處置: kintone.fieldTypes.Number;
          處置名稱: kintone.fieldTypes.SingleLineText;
          處置代碼: kintone.fieldTypes.SingleLineText;
          數量_處置: kintone.fieldTypes.Number;
          處置單價: kintone.fieldTypes.Number;
          處置費小計: kintone.fieldTypes.Calc;
        }
      }>
    };
    用藥: {
      type: 'SUBTABLE'
      value: Array<{
        id: string;
        value: {
          藥品代碼: kintone.fieldTypes.SingleLineText;
          藥品單價: kintone.fieldTypes.Number;
          成數_藥品: kintone.fieldTypes.Number;
          劑量: kintone.fieldTypes.Number;
          天數: kintone.fieldTypes.Number;
          藥品名稱: kintone.fieldTypes.SingleLineText;
          總量: kintone.fieldTypes.Number;
          用藥備註: kintone.fieldTypes.SingleLineText;
          頻率: kintone.fieldTypes.SingleLineText;
          藥費小計: kintone.fieldTypes.Calc;
        }
      }>
    };
    檢驗: {
      type: 'SUBTABLE'
      value: Array<{
        id: string;
        value: {
          檢驗備註: kintone.fieldTypes.SingleLineText;
          檢驗單號: kintone.fieldTypes.SingleLineText;
          成數_檢驗: kintone.fieldTypes.Number;
          檢驗日期: kintone.fieldTypes.Date;
          檢驗單價: kintone.fieldTypes.Number;
          檢驗代碼: kintone.fieldTypes.SingleLineText;
          檢驗單狀態: kintone.fieldTypes.DropDown;
          檢驗名稱: kintone.fieldTypes.SingleLineText;
          檢驗費小計: kintone.fieldTypes.Calc;
        }
      }>
    };
  }

  type Fc<T extends string> = {
    [key in T]: `${key}`
  }

  namespace E {
    interface Opd {
      type: string;
      record?: KintoneTypes.Opd;
      records?: (KintoneTypes.Opd)[];
      error?: string;
      action?: { value: string };
      nextStatus?: { value: string };
      status?: { value: string };
    }
  }
}