import React, { ReactElement } from 'react'
import { KintoneTypes } from '../dts/types'
import { Table, Button, ConfigProvider, Input, InputNumber, AutoComplete } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import type { TableColumnsType, TableProps } from 'antd'

type StaffValue = {
  code: string;
  name: string;
}
type StaffOption = {
  label: string,
  value: string
}
interface Props {
  table: KintoneTypes.TreaTable[];
  staff: StaffValue[];
  deleteRow: (index: number) => void;
  handleTableInput: (input: {
    rowIndex: number,
    colName: keyof KintoneTypes.TreaField,
    inputValue: string | StaffValue[]
  }) => void;
}
interface DataType {
  key: React.Key,
  code: string,
  name: string,
  amount: string | ReactElement,
  staff: string | ReactElement,
  memo: string | ReactElement,
  price: number | string,
  discount: number | string | ReactElement,
  subtotal: number | string,
  action: ReactElement
}

// * 表格設定
const columns: TableColumnsType<DataType> = [
  { title: '處置代碼', dataIndex: 'code' },
  { title: '處置名稱', dataIndex: 'name' },
  { title: '數量', dataIndex: 'amount' },
  { title: '績效', dataIndex: 'staff' },
  { title: '處置備註', dataIndex: 'memo' },
  { title: '處置單價', dataIndex: 'price' },
  { title: '成數', dataIndex: 'discount' },
  { title: '處置費小計', dataIndex: 'subtotal' },
  { title: '', dataIndex: 'action' }
]
const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra)
}

// *** MAIN COMPONENT ***
const TreaTable: React.FC<Props> = ({ table, staff, deleteRow, handleTableInput }) => {
  // * 設定績效使用者搜尋欄
  const [options, setOptions] = React.useState<StaffOption[]>([])
  const handleSearch = (value: string) => {
    setOptions(() => {
      const options = staff.filter(user => user.code.includes(value) || user.name.includes(value))
      if (options.length === 0) return []

      return options.map<StaffOption>(user => ({
        label: user.name,
        value: `${user.name} (${user.code})`
      }))
    })
  }
  
  // ** 產生表格列 **
  const data: DataType[] = table?.map((row, index) => {
    const cell = row.value
    return {
      key: index,

      // [處置代碼]
      code: cell.處置代碼.value,

      // [處置名稱]
      name: cell.處置名稱.value,

      // [數量]
      amount: (<InputNumber
        value={cell.數量_處置.value}
        style={{ width: 50 }} controls={false}
        onChange={n => {
          const rowIndex = index
          const amount = Number(n) || 0
          const price = Number(cell.處置單價.value)
          const discount = Number(cell.成數_處置.value) / 100
          const subtotal = (price * amount * discount).toString()

          handleTableInput({ rowIndex, colName: '數量_處置', inputValue: amount.toString()})
          handleTableInput({ rowIndex, colName: '處置費小計', inputValue: subtotal })
        }}
      />),

      // [績效]
      staff: (<AutoComplete
        value={cell.績效.value.length === 1 ? `${cell.績效.value[0].name} (${cell.績效.value[0].code})` : undefined}
        style={{ width: 200 }}
        onSearch={handleSearch}
        options={options}
        allowClear
        onChange={v => {
          if (!v) handleTableInput({ rowIndex: index, colName: '績效', inputValue: [] })
        }}
        onSelect={(v: string) => {
          const user = v.split(/\(|\)/).map(item => item.trim()).filter(item => item !== '')
          const inputValue = [{ code: user[1], name: user[0] }]
          handleTableInput({ rowIndex: index, colName: '績效', inputValue })
        }}
      />),

      // [處置備註]
      memo: (<Input 
        value={cell.處置備註.value}
        onChange={e => handleTableInput({ rowIndex: index, colName: '處置備註', inputValue: e.target.value })}
      />),

      // [處置單價]
      price: cell.處置單價.value,

      // [成數]
      discount: (<InputNumber 
        value={cell.成數_處置.value} 
        min='0' max='100' style={{ width: 50 }} controls={false}
        onChange={n => {
          const inputValue = n ?? '100'
          const rowIndex = index
          const amount = Number(cell.數量_處置.value)
          const price = Number(cell.處置單價.value)
          const discount = Number(inputValue) / 100
          const subtotal = (price * amount * discount).toString()

          handleTableInput({ rowIndex: index, colName: '成數_處置', inputValue })
          handleTableInput({ rowIndex, colName: '處置費小計', inputValue: subtotal })
        }}
      />),

      // [處置費小計]
      subtotal: cell.處置費小計.value,

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

export default TreaTable