/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { KintoneTypes } from '../dts/types'
import MediSearch from './MediSearch'
import { getRecord, isMobile, setRecord } from 'kchelper'
import MediTable from './MediTable'

interface Props {
  event: KintoneTypes.E.Opd;
}
interface RowInput {
  array?: KintoneTypes.MediTable[],
  rowIndex: number,
  colName: keyof KintoneTypes.MediField,
  inputValue: string 
}

const deleteByIndex = (array: KintoneTypes.MediTable[], index: number) => {
  const newArray = [...array]
  newArray.splice(index, 1)
  
  newArray.forEach(row => {
    // 解決刪除欄時藥品代碼會沒有執行取得的bug
    row.value.藥品代碼.lookup = true
  })

  return newArray
}
const inputByIndex = ({ array, rowIndex, colName, inputValue } : RowInput) => {
  const newArray = [...array!]
  newArray[rowIndex].value[colName].value = inputValue
  return newArray
}

// *** MAIN COMPONENT ***
const MediDiv: React.FC<Props> = ({ event }) => {
  const mobile = isMobile(event)
  const [table, setTable] = useState<KintoneTypes.MediTable[]>(event.record!.用藥.value)

  // * 表格新增列
  const addToTable = (newRow: KintoneTypes.MediTable) => {
    // 取得記錄內容
    const record: KintoneTypes.Opd = getRecord(mobile)
    const table = record.用藥.value

    // 清除預設空白行
    if (!table[0].value.藥品代碼.value) table.shift()

    // 更新表格內容＆畫面
    table.push(newRow)
    record.用藥.value = table
    setRecord(record, mobile)
    setTable(table)
  }
  // * 表格刪除列
  const deleteRow = (index: number) => {
    const record: KintoneTypes.Opd = getRecord(mobile)
    const updatedTable = deleteByIndex(table, index)
    record.用藥.value = updatedTable
    setRecord(record, mobile)
    setTable(updatedTable)
  }
  // * 表格編輯列
  const handleTableInput = ({ rowIndex, colName, inputValue }: RowInput) => {
    const record: KintoneTypes.Opd = getRecord(mobile)
    const updatedTable = inputByIndex({array: table, rowIndex, colName, inputValue})
    record.用藥.value = updatedTable
    setRecord(record, mobile)
    setTable(updatedTable)
  }

  // * 初始化表格內容（useEffect）
  useEffect(() => {
    // 取得記錄內容
    const record: KintoneTypes.Opd = getRecord(mobile)
    const table = record.用藥.value

    // 清除預設空白行
    if (!table[0].value.藥品代碼.value) {
      table.shift()
      // 更新表格內容 & 更新畫面
      record.用藥.value = table
      setRecord(record, mobile)
      setTable(table)
    }
  }, [])

  // * RETURN
  return (
    <div style={{ marginLeft: '8px' }}>
      <MediSearch 
        priceCode={event.record!.批價代碼.value}
        addToTable={addToTable}
      />
      <MediTable
        table={table}
        deleteRow={deleteRow}
        handleTableInput={handleTableInput}
      />
    </div>
  )
}

export default MediDiv