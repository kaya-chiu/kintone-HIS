/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { KintoneTypes } from '../dts/types'
import ExamTable from './ExamTable'
import ExamSearch from './ExamSearch'
import { getRecord, isMobile, setRecord } from 'kchelper'

interface Props {
  event: KintoneTypes.E.Opd;
}
interface RowInput {
  array?: KintoneTypes.ExamTable[],
  rowIndex: number,
  colName: keyof KintoneTypes.ExamField,
  inputValue: string 
}

const deleteByIndex = (array: KintoneTypes.ExamTable[], index: number) => {
  const newArray = [...array]
  newArray.splice(index, 1)

  newArray.forEach(row => {
    // 解決刪除欄時檢驗代碼會沒有執行取得的bug
    row.value.檢驗代碼.lookup = true
    // 解決刪除有帶入檢驗單號之列時，下一行檢驗單號空值會帶入錯誤的bug
    if (row.value.檢驗單號.value.length === 0) {
      row.value.檢驗單號.lookup = 'CLEAR'
    } else {
      row.value.檢驗單號.lookup = true
    }
  })
  
  return newArray
}
const inputByIndex = ({ array, rowIndex, colName, inputValue } : RowInput) => {
  const newArray = [...array!]
  newArray[rowIndex].value[colName].value = inputValue

  // 如果更新欄位是「檢驗單號」，有值時執行 LOOKUP，值為空時則清除
  if (colName === '檢驗單號' && inputValue.length > 0) {
    newArray[rowIndex].value[colName].lookup = true
  } else if (colName === '檢驗單號' && inputValue.length === 0) {
    newArray[rowIndex].value[colName].lookup = 'CLEAR'
  }

  return newArray
}

// *** MAIN COMPONENT ***
const ExamDiv: React.FC<Props> = ({ event }) => {
  const mobile = isMobile(event)
  const [table, setTable] = useState<KintoneTypes.ExamTable[]>(event.record!.檢驗.value)

  // * 表格新增列
  const addToTable = (newRow: KintoneTypes.ExamTable) => {
    // 取得記錄內容
    const record: KintoneTypes.Opd = getRecord(mobile)
    const table = record.檢驗.value

    // 清除預設空白行
    if (!table[0].value.檢驗代碼.value) table.shift()

    // 更新表格內容＆畫面
    table.push(newRow)
    record.檢驗.value = table
    setRecord(record, mobile)
    setTable(table)
  }  
  // * 表格刪除列
  const deleteRow = (index: number) => {
    const record: KintoneTypes.Opd = getRecord(mobile)
    const updatedTable = deleteByIndex(table, index)
    record.檢驗.value = updatedTable
    setRecord(record, mobile)
    setTable(updatedTable)
  }
  // * 表格編輯列
  const handleTableInput = ({ rowIndex, colName, inputValue }: RowInput) => {
    const record: KintoneTypes.Opd = getRecord(mobile)
    const updatedTable = inputByIndex({array: table, rowIndex, colName, inputValue})
    record.檢驗.value = updatedTable
    setRecord(record, mobile)
    setTable(updatedTable)
  }

  // * 初始化表格內容（useEffect）
  useEffect(() => {
    // 取得記錄內容
    const record: KintoneTypes.Opd = getRecord(mobile)
    const table = record.檢驗.value

    // 清除預設空白行
    if (!table[0].value.檢驗代碼.value) {
      table.shift()
      // 更新表格內容 & 更新畫面
      record.檢驗.value = table
      setRecord(record, mobile)
      setTable(table)
    }
  }, [])

  // * RETURN
  return (
    <div style={{ marginLeft: '8px' }}>
      <ExamSearch 
        priceCode={event.record!.批價代碼.value}
        addToTable={addToTable}
      />
      <ExamTable 
        cn={event.record?.病歷號碼.value}
        table={table} 
        deleteRow={deleteRow}
        handleTableInput={handleTableInput}
      />
    </div>
  )
}

export default ExamDiv