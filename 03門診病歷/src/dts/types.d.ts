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
    姓名: kintone.fieldTypes.SingleLineText;
    身份別: kintone.fieldTypes.SingleLineText;
    實收: kintone.fieldTypes.Number;
    病歷號碼: kintone.fieldTypes.SingleLineText;
    批價代碼: kintone.fieldTypes.Number;
    生日: kintone.fieldTypes.Date;
    批價狀態: kintone.fieldTypes.DropDown;
    Objective: kintone.fieldTypes.MultiLineText;
    批價幣別: kintone.fieldTypes.SingleLineText;
    就診日期: kintone.fieldTypes.Date;
    掛號費_台幣: kintone.fieldTypes.Number;
    已領藥: kintone.fieldTypes.DropDown;
    看診序號: kintone.fieldTypes.SingleLineText;
    掛號流水號: kintone.fieldTypes.SingleLineText;
    性別: kintone.fieldTypes.SingleLineText;
    門診時段: kintone.fieldTypes.SingleLineText;
    門診別: kintone.fieldTypes.DropDown;
    Subjective: kintone.fieldTypes.MultiLineText;
    預欠收: kintone.fieldTypes.Number;
    分區: kintone.fieldTypes.SingleLineText;
    就診類別: kintone.fieldTypes.SingleLineText;
    療程別: kintone.fieldTypes.SingleLineText;
    病歷記錄流水號: kintone.fieldTypes.SingleLineText;
    身份證號: kintone.fieldTypes.SingleLineText;
    掛號費_美金: kintone.fieldTypes.Number;
    應收: kintone.fieldTypes.Calc;
    掛號費: kintone.fieldTypes.Calc;
    處置費: kintone.fieldTypes.Calc;
    檢驗費: kintone.fieldTypes.Calc;
    結餘: kintone.fieldTypes.Calc;
    就診時年齡: kintone.fieldTypes.Calc;
    藥費: kintone.fieldTypes.Calc;
    狀態: {
      type: 'STATUS',
      value: string | null | undefined
    }

    關聯者: kintone.fieldTypes.UserSelect;
    看診醫師: kintone.fieldTypes.UserSelect;
    單窗: kintone.fieldTypes.UserSelect;
    主治醫師: kintone.fieldTypes.UserSelect;
    處置: {
      type: 'SUBTABLE';
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
          績效: kintone.fieldTypes.UserSelect;
        };
      }>;
    };
    用藥: {
      type: 'SUBTABLE';
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
          頻率: kintone.fieldTypes.DropDown;
          藥費小計: kintone.fieldTypes.Calc;
        };
      }>;
    };
    檢驗: {
      type: 'SUBTABLE';
      value: Array<{
        id: string;
        value: {
          檢驗備註: kintone.fieldTypes.SingleLineText;
          檢驗單號: kintone.fieldTypes.SingleLineText & { lookup?: true | 'CLEAR' };
          成數_檢驗: kintone.fieldTypes.Number;
          檢驗日期: kintone.fieldTypes.Date;
          檢驗單價: kintone.fieldTypes.Number;
          分管組合: kintone.fieldTypes.SingleLineText;
          檢驗代碼: kintone.fieldTypes.SingleLineText;
          檢驗單狀態: kintone.fieldTypes.DropDown;
          檢驗名稱: kintone.fieldTypes.SingleLineText;
          檢驗費小計: kintone.fieldTypes.Calc;
        };
      }>;
    };
  }

  type ExamField = {
    檢驗備註: kintone.fieldTypes.SingleLineText;
    檢驗單號: kintone.fieldTypes.SingleLineText & { lookup?: true | 'CLEAR' };
    成數_檢驗: kintone.fieldTypes.Number;
    檢驗日期: kintone.fieldTypes.Date;
    檢驗單價: kintone.fieldTypes.Number;
    分管組合: kintone.fieldTypes.SingleLineText;
    檢驗代碼: kintone.fieldTypes.SingleLineText & { lookup?: true | 'CLEAR' };
    檢驗單狀態: kintone.fieldTypes.DropDown;
    檢驗名稱: kintone.fieldTypes.SingleLineText;
    檢驗費小計: kintone.fieldTypes.Calc;
  }

  type ExamTable = {
    id: string;
    value: ExamField;
  }

  type EDB = Base & {
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

  type ECI = Base & {
    檢驗單號: kintone.fieldTypes.SingleLineText;
    病歷號碼: kintone.fieldTypes.SingleLineText;
    檢驗日期: kintone.fieldTypes.Date;
    生日: kintone.fieldTypes.Date;
    檢驗代碼: kintone.fieldTypes.SingleLineText;
    姓名: kintone.fieldTypes.SingleLineText;
    退單記錄: kintone.fieldTypes.SingleLineText;
    性別: kintone.fieldTypes.SingleLineText;
    條碼號: kintone.fieldTypes.SingleLineText;
    開單記錄: kintone.fieldTypes.SingleLineText;
    身份證號: kintone.fieldTypes.SingleLineText;
    檢驗名稱: kintone.fieldTypes.SingleLineText;
    主治醫師: kintone.fieldTypes.UserSelect;
    狀態: { type: 'STATUS', value: string };
  }

  type MediField = {
    藥品代碼: kintone.fieldTypes.SingleLineText & { lookup?: true | 'CLEAR' };
    藥品單價: kintone.fieldTypes.Number;
    成數_藥品: kintone.fieldTypes.Number;
    劑量: kintone.fieldTypes.Number;
    天數: kintone.fieldTypes.Number;
    藥品名稱: kintone.fieldTypes.SingleLineText;
    總量: kintone.fieldTypes.Number;
    用藥備註: kintone.fieldTypes.SingleLineText;
    頻率: kintone.fieldTypes.DropDown;
    藥費小計: kintone.fieldTypes.Calc;
  }

  type MediTable = {
    id: string;
    value: MediField;
  }

  type MDB = Base & {
    啟用狀態: kintone.fieldTypes.RadioButton;
    藥品名稱: kintone.fieldTypes.SingleLineText;
    預設劑量: kintone.fieldTypes.Number;
    價格3: kintone.fieldTypes.Number;
    預設頻率: kintone.fieldTypes.DropDown;
    價格1: kintone.fieldTypes.Number;
    價格2: kintone.fieldTypes.Number;
    藥品代碼: kintone.fieldTypes.SingleLineText;
  }

  type TreaField = {
    處置備註: kintone.fieldTypes.SingleLineText;
    成數_處置: kintone.fieldTypes.Number;
    處置名稱: kintone.fieldTypes.SingleLineText;
    處置代碼: kintone.fieldTypes.SingleLineText & { lookup?: true | 'CLEAR' };
    數量_處置: kintone.fieldTypes.Number;
    處置單價: kintone.fieldTypes.Number;
    處置費小計: kintone.fieldTypes.Calc;
    績效: kintone.fieldTypes.UserSelect;
  }

  type TreaTable = {
    id: string;
    value: TreaField
  }

  type TDB = Base & {
    啟用狀態: kintone.fieldTypes.RadioButton;
    處置名稱: kintone.fieldTypes.SingleLineText;
    處置代碼: kintone.fieldTypes.SingleLineText;
    價格3: kintone.fieldTypes.Number;
    價格1: kintone.fieldTypes.Number;
    價格2: kintone.fieldTypes.Number;
  }

  type Fc<T extends string> = {
    [key in T]: `${key}`
  }

  type Freq = 'QD' | 'BID' | 'TID' | 'QID' | 'QOD' | 'Q3D' | 'QW' | 'BIW' | 'HS' | 'STAT' | 'PRN'

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