/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { KintoneTypes } from '../dts/types'
import { EventProvider } from './EventProvider'
import ExamTable from './ExamTable'
import ExamSearch from './ExamSearch'
import { getRecord, isMobile, setRecord } from 'kchelper'

interface Props {
  event: KintoneTypes.E.Opd;
}

const ExamDiv: React.FC<Props> = ({ event }) => {
  const [records, setRecords] = useState<KintoneTypes.ExamTable[]>(event.record!.檢驗.value)

  const addToTable = (newRow: KintoneTypes.ExamTable) => {
    // 取得記錄內容
    const record: KintoneTypes.Opd = getRecord(isMobile(event))
    const table = record.檢驗.value

    // 清除預設空白行
    if (!table[0].value.檢驗代碼.value) {
      table.shift()
    }

    // 更新表格內容
    table.push(newRow)
    record.檢驗.value = table
    setRecord(record)

    // 更新畫面
    setRecords(table)
  }

  const deleteByIndex = (array: KintoneTypes.ExamTable[], index: number) => {
    const newArray = [...array]
    newArray.splice(index, 1)
    return newArray
  }

  const deleteRow = (index: number) => {
    const record: KintoneTypes.Opd = getRecord(isMobile(event))
    const updatedTable = deleteByIndex(records, index)
    record.檢驗.value = updatedTable
    setRecord(record)
    setRecords(updatedTable)
  }

  useEffect(() => {
    // 取得記錄內容
    const record: KintoneTypes.Opd = getRecord(isMobile(event))
    const table = record.檢驗.value

    // 清除預設空白行
    if (!table[0].value.檢驗代碼.value) {
      table.shift()
      // 更新表格內容 & 更新畫面
      record.檢驗.value = table
      setRecord(record)
      setRecords(table)
    }
  }, [])

  return (
    <div style={{ marginLeft: '8px' }}>
      <EventProvider event={event}>
        <ExamSearch 
          priceCode={event.record!.批價代碼.value}
          addToTable={addToTable}
        />
        <ExamTable records={records} setRecords={setRecords} deleteRow={deleteRow}/>
      </EventProvider>
    </div>
  )
}

export default ExamDiv