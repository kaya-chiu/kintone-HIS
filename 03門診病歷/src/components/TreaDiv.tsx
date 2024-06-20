/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { KintoneTypes } from '../dts/types'
import { getRecord, isMobile, setRecord } from 'kchelper'
import getStaff from '../api/staff'
import TreaSearch from './TreaSearch'
import TreaTable from './TreaTable'

type StaffValue = {
  code: string;
  name: string;
}
interface Props {
  event: KintoneTypes.E.Opd;
}
interface RowInput {
  array?: KintoneTypes.TreaTable[],
  rowIndex: number,
  colName: keyof KintoneTypes.TreaField,
  inputValue: string | StaffValue[]
}

const deleteByIndex = (array: KintoneTypes.TreaTable[], index: number) => {
  const newArray = [...array]
  newArray.splice(index, 1)

  newArray.forEach(row => {
    // 解決刪除欄時處置代碼會沒有執行取得的bug
    row.value.處置代碼.lookup = true
  })

  return newArray
}
const inputByIndex = ({ array, rowIndex, colName, inputValue } : RowInput) => {
  const newArray = [...array!]
  newArray[rowIndex].value[colName].value = inputValue
  return newArray
}

// *** MAIN COMPONENT ***
const TreaDiv: React.FC<Props> = ({ event }) => {
  const mobile = isMobile(event)
  const [table, setTable] = useState<KintoneTypes.TreaTable[]>(event.record!.處置.value)
  const [staff, setStaff] = useState<StaffValue[]>([])

  // * 表格新增列
  const addToTable = (newRow: KintoneTypes.TreaTable) => {
    // 取得記錄內容
    const record: KintoneTypes.Opd = getRecord(mobile)
    const table = record.處置.value

    // 清除預設空白行
    if (!table[0].value.處置代碼.value) table.shift()

    // 更新表格內容＆畫面
    table.push(newRow)
    record.處置.value = table
    setRecord(record, mobile)
    setTable(table)
  }
  // * 表格刪除列
  const deleteRow = (index: number) => {
    const record: KintoneTypes.Opd = getRecord(mobile)
    const updatedTable = deleteByIndex(table, index)
    record.處置.value = updatedTable
    setRecord(record, mobile)
    setTable(updatedTable)
  }
  // * 表格編輯列
  const handleTableInput = ({ rowIndex, colName, inputValue }: RowInput) => {
    const record: KintoneTypes.Opd = getRecord(mobile)
    const updatedTable = inputByIndex({array: table, rowIndex, colName, inputValue})
    record.處置.value = updatedTable
    setRecord(record, mobile)
    setTable(updatedTable)
  }

  // * 初始化表格內容（useEffect
  useEffect(() => {
    // 取得記錄內容
    const record: KintoneTypes.Opd = getRecord(mobile)
    const table = record.處置.value

    // 清除預設空白行
    if (!table[0].value.處置代碼.value) {
      table.shift()
      // 更新表格內容 & 更新畫面
      record.處置.value = table
      setRecord(record, mobile)
      setTable(table)
    }

    // 取得員工資料
    getStaff()
      .then(records => {
        const staffData = records.map(r => r.使用者.value[0])
        setStaff(staffData)
      })
      .catch(err => console.error(err))
  }, [])

  // * RETURN
  return (
    <div style={{ marginLeft: '8px' }}>
      <TreaSearch 
        priceCode={event.record!.批價代碼.value}
        addToTable={addToTable}
      />
      <TreaTable
        table={table} staff={staff}
        deleteRow={deleteRow}
        handleTableInput={handleTableInput}
      />
    </div>
  )
}

export default TreaDiv