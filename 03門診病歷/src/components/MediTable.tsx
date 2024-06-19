import React, { ReactElement } from 'react'
import { KintoneTypes } from '../dts/types'
import { Table, Button, ConfigProvider, Input, InputNumber, Select } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import type { TableColumnsType, TableProps } from 'antd'
import drugCount from '../handlers/drugCount'

const { Option } = Select

interface Props {
  table: KintoneTypes.MediTable[];
  deleteRow: (index: number) => void;
  handleTableInput: (input: {
    rowIndex: number,
    colName: keyof KintoneTypes.MediField,
    inputValue: string
  }) => void;
}
interface DataType {
  key: React.Key,
  code: string,
  name: string,
  frequency: string | ReactElement,
  dose: string | ReactElement,
  day: string | ReactElement,
  count: string | ReactElement,
  memo: string | ReactElement,
  price: number | string,
  discount: number | string | ReactElement,
  subtotal: number | string,
  action: ReactElement
}

// * 表格設定
const freq: KintoneTypes.Freq[] = ['QD', 'BID', 'TID', 'QID', 'QOD', 'Q3D', 'QW', 'BIW', 'HS', 'STAT', 'PRN']
const FreqOptions = freq.map(f => <Option value={f}>{f}</Option>)
const columns: TableColumnsType<DataType> = [
  { title: '藥品代碼', dataIndex: 'code' },
  { title: '藥品名稱', dataIndex: 'name' },
  { title: '頻率', dataIndex: 'frequency' },
  { title: '劑量', dataIndex: 'dose' },
  { title: '天數', dataIndex: 'day' },
  { title: '總量', dataIndex: 'count' },
  { title: '用藥備註', dataIndex: 'memo' },
  { title: '藥品單價', dataIndex: 'price' },
  { title: '成數', dataIndex: 'discount' },
  { title: '藥費小計', dataIndex: 'subtotal' },
  { title: '', dataIndex: 'action' }
]
const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra)
}

// *** MAIN COMPONENT ***
const MediTable: React.FC<Props> = ({ table, deleteRow, handleTableInput }) => {
  
  // ** 產生表格列 **
  const data: DataType[] = table?.map((row, index) => {
    const cell = row.value
    return {
      key: index,

      // [藥品代碼]
      code: cell.藥品代碼.value,

      // [藥品名稱]
      name: cell.藥品名稱.value,

      // [頻率]
      frequency: (
        <Select
          value={cell.頻率.value}
          style={{ width: 100 }}
          onChange={inputValue => {
            const rowIndex = index
            const dose = Number(cell.劑量.value)
            const day = Number(cell.天數.value)
            const price = Number(cell.藥品單價.value)
            const discount = Number(cell.成數_藥品.value) / 100
            const count = drugCount(dose, inputValue as KintoneTypes.Freq, day)
            const subtotal = (price * count * discount).toString()

            handleTableInput({ rowIndex, colName: '頻率', inputValue })
            handleTableInput({ rowIndex, colName: '總量', inputValue: count.toString() })
            handleTableInput({ rowIndex, colName: '藥費小計', inputValue: subtotal })
          }}
        >
          {FreqOptions}
        </Select>
      ),

      // [劑量]
      dose: (<InputNumber
        value={cell.劑量.value}
        style={{ width: 50 }} controls={false}
        onChange={n => {
          const rowIndex = index
          const dose = Number(n) || 0
          const freq = cell.頻率.value as KintoneTypes.Freq
          const day = Number(cell.天數.value)
          const price = Number(cell.藥品單價.value)
          const discount = Number(cell.成數_藥品.value) / 100
          const count = drugCount(dose, freq, day)
          const subtotal = (price * count * discount).toString()

          handleTableInput({ rowIndex, colName: '劑量', inputValue: n || '0' })
          handleTableInput({ rowIndex, colName: '總量', inputValue: count.toString() })
          handleTableInput({ rowIndex, colName: '藥費小計', inputValue: subtotal })
        }}
      />),

      // [天數]
      day: (<InputNumber
        value={cell.天數.value}
        style={{ width: 50 }} controls={false}
        onChange={n => {
          const rowIndex = index
          const dose = Number(cell.劑量.value)
          const freq = cell.頻率.value as KintoneTypes.Freq
          const day = Number(n) || 1
          const price = Number(cell.藥品單價.value)
          const discount = Number(cell.成數_藥品.value) / 100
          const count = drugCount(dose, freq, day)
          const subtotal = (price * count * discount).toString()

          handleTableInput({ rowIndex, colName: '天數', inputValue: n || '1' })
          handleTableInput({ rowIndex, colName: '總量', inputValue: count.toString() })
          handleTableInput({ rowIndex, colName: '藥費小計', inputValue: subtotal })
        }}
      />),

      // [總量]
      count: (<InputNumber
        value={cell.總量.value}
        style={{ width: 50 }} controls={false}
        onChange={n => {
          const rowIndex = index
          const price = Number(cell.藥品單價.value)
          const discount = Number(cell.成數_藥品.value) / 100
          const count = Number(n) || 0
          const subtotal = (price * count * discount).toString()

          handleTableInput({ rowIndex, colName: '總量', inputValue: count.toString() })
          handleTableInput({ rowIndex, colName: '藥費小計', inputValue: subtotal })
        }}
      />),

      // [用藥備註]
      memo: (<Input 
        value={cell.用藥備註.value}
        onChange={e => handleTableInput({ rowIndex: index, colName: '用藥備註', inputValue: e.target.value })}
      />),

      // [藥品單價]
      price: cell.藥品單價.value,

      // [成數]
      discount: (<InputNumber 
        value={cell.成數_藥品.value} 
        min='0' max='100' style={{ width: 50 }} controls={false}
        onChange={n => {
          const inputValue = n ?? '100'
          const rowIndex = index
          const price = Number(cell.藥品單價.value)
          const discount = Number(inputValue) / 100
          const count = Number(cell.總量.value)
          const subtotal = (price * count * discount).toString()

          handleTableInput({ rowIndex: index, colName: '成數_藥品', inputValue })
          handleTableInput({ rowIndex, colName: '藥費小計', inputValue: subtotal })
        }}
      />),

      // [藥費小計]
      subtotal: cell.藥費小計.value,

      // [動作按鈕]（刪除）
      action: (<Button 
        type="primary" shape="circle" size="small"
        icon={<CloseOutlined />}
        onClick={() => deleteRow(index)}
        danger
      />)
    }
  })
  
  // * RETURN
  return (
    <ConfigProvider theme={{
      components: {
        Table: {
          headerBg: '#3498db',
          headerColor: '#FFFFFF'
        },
        Button: {
          colorPrimary: '#3498db'
        }
      }
    }}>
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </ConfigProvider>
  )
}

export default MediTable