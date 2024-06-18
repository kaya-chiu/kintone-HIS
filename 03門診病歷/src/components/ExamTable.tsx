import React, { ReactElement, useState } from 'react'
import dayjs from 'dayjs'
import { KintoneTypes } from '../dts/types'
import { Table, Button, ConfigProvider, Input, DatePicker, InputNumber, Select } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import type { TableColumnsType, TableProps } from 'antd'
import ExamModal from './ExamModal'
import searchECI from '../api/searchECI'

const { Option } = Select
const { Search } = Input

interface Props {
  cn: string | undefined;
  table: KintoneTypes.ExamTable[];
  deleteRow: (index: number) => void;
  handleTableInput: (input: {
    rowIndex: number,
    colName: keyof KintoneTypes.ExamField,
    inputValue: string
  }) => void;
}
interface DataType {
  key: React.Key,
  code: string,
  name: string,
  date: string | ReactElement,
  status: string | ReactElement,
  serialNum: string | ReactElement,
  memo: string | ReactElement,
  price: number | string,
  discount: number | string | ReactElement,
  subtotal: number | string,
  group: string
}

// * 表格設定
const canEdit = ['預開', '急開', '退單']
const columns: TableColumnsType<DataType> = [
  { title: '檢驗代碼', dataIndex: 'code' },
  { title: '檢驗名稱', dataIndex: 'name', },
  { title: '檢驗日期', dataIndex: 'date', },
  { title: '檢驗單狀態', dataIndex: 'status', },
  { title: '檢驗單號', dataIndex: 'serialNum', },
  { title: '檢驗備註', dataIndex: 'memo', },
  { title: '檢驗單價', dataIndex: 'price', },
  { title: '成數', dataIndex: 'discount', },
  { title: '檢驗費小計', dataIndex: 'subtotal', },
  { title: '', dataIndex: 'action',  }
]
const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra)
}

// *** MAIN COMPONENT ***
const ExamTable: React.FC<Props> = ({ cn, table, deleteRow, handleTableInput }) => { 
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [modalData, setModalData] = useState<KintoneTypes.ECI[]>([])
  const [modalIndex, setModalIndex] = useState<number | undefined>()
  
  // * 檢驗日期選擇
  const onDateSelect = (date: dayjs.Dayjs, rowIndex: number) => {
    const dateString = date.format('YYYY-MM-DD')
    handleTableInput({ rowIndex, colName: '檢驗日期', inputValue: dateString})
  }

  // ** 產生表格列 **
  const data: DataType[] = table?.map((row, index) => {
    const cell = row.value
    return {
      key: index, 

      // [檢驗代碼]
      code: cell.檢驗代碼.value, 

      // [檢驗名稱]
      name: cell.檢驗名稱.value, 
      
      // [檢驗日期]
      date: (<DatePicker 
        defaultValue={dayjs(cell.檢驗日期.value)}
        onChange={date => onDateSelect(date, index)}
        allowClear={false} suffixIcon={null}
        disabled={!canEdit.includes(cell.檢驗單狀態.value)}
      />),

      // [檢驗單狀態]
      status: (
        <Select 
          defaultValue={cell.檢驗單狀態.value}
          onChange={inputValue => {
            const isRefund = inputValue === '退單'
            let subtotal = Math.abs(Number(cell.檢驗單價.value) * Number(cell.成數_檢驗.value) / 100)
            if (subtotal > 0 && isRefund) subtotal = subtotal * (-1)

            handleTableInput({ rowIndex: index, colName: '檢驗單狀態', inputValue })
            handleTableInput({ rowIndex: index, colName: '檢驗費小計', inputValue: subtotal.toString() })

            // 若點選「退單」以外的選項，則清除檢驗單號
            if (!isRefund) {
              handleTableInput({ rowIndex: index, colName: '檢驗單號', inputValue: '' })
            }
          }}
          disabled={!canEdit.includes(cell.檢驗單狀態.value)}
        >
          <Option value="預開">預開</Option>
          <Option value="急開">急開</Option>
          <Option value="退單">退單</Option>
        </Select>
      ),

      // [檢驗單號]
      serialNum: (<Search 
        allowClear
        disabled={cell.檢驗單狀態.value !== '退單'}
        value={cell.檢驗單號.value}
        placeholder={cell.檢驗單狀態.value === '退單' ? '請直接按enter或搜尋鍵' : ''}
        onChange={e => handleTableInput({ rowIndex: index, colName: '檢驗單號', inputValue: e.target.value })}
        onSearch={async (value, _e, info) => {
          // 點選清除鈕時，清除檢驗單號
          if (info?.source === 'clear') {
            handleTableInput({ rowIndex: index, colName: '檢驗單號', inputValue: '' })
            return
          }

          // 啟動 Modal
          setModalIndex(index)
          setOpen(true)
          setLoading(true)

          // 檢查病歷號是否存在
          if (!cn) {
            window.alert('請輸入病歷號碼')
            return false
          }
          // @ts-expect-error: 從「04檢驗報到台」搜尋相關檢驗單記錄
          const result: KintoneTypes.ECI[] = await searchECI({
            date: cell.檢驗日期.value,
            code: cell.檢驗代碼.value,
            cn,
            input: value
          })

          // 設定 Modal 內容
          setModalData(result)
          setLoading(false)     
        }}
        style={{ maxWidth: 500 }} 
      />),

      // [檢驗備註]
      memo: (<Input 
        defaultValue={cell.檢驗備註.value}
        onChange={e => handleTableInput({ rowIndex: index, colName: '檢驗備註', inputValue: e.target.value })}
        disabled={!canEdit.includes(cell.檢驗單狀態.value)}
      />),

      // [檢驗單價]
      price: cell.檢驗單價.value,

      // [成數]
      discount: (<InputNumber 
        defaultValue={cell.成數_檢驗.value} 
        min='0' max='100' style={{ width: 50 }} controls={false}
        onChange={n => {
          const num = n ?? '100'
          const subtotal = (Number(cell.檢驗單價.value) * Number(num) / 100).toString()

          // 成數變動時，同時更新檢驗費小計的計算結果
          handleTableInput({ rowIndex: index, colName: '成數_檢驗', inputValue: num })
          handleTableInput({ rowIndex: index, colName: '檢驗費小計', inputValue: subtotal })
        }}
        disabled={!canEdit.includes(cell.檢驗單狀態.value)}
      />),

      // [檢驗費小計]
      subtotal: cell.檢驗費小計.value,

      // [分管組合]
      group: cell.分管組合.value,

      // [動作按鈕] （刪除）
      action: (<Button 
        type="primary" shape="circle" size="small"
        icon={<CloseOutlined />}
        onClick={() => deleteRow(index)}
        disabled={!canEdit.includes(cell.檢驗單狀態.value)}
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
      <ExamModal 
        open={open} setOpen={setOpen} loading={loading}
        data={modalData} index={modalIndex}
        handleTableInput={handleTableInput}
      />
    </ConfigProvider>
    
  )
}

export default ExamTable