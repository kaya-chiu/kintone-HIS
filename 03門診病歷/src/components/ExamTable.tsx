/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Table, Button, ConfigProvider } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import type { TableColumnsType, TableProps } from 'antd'
import { KintoneTypes } from '../dts/types'

interface Props {
  records: KintoneTypes.ExamTable[];
  setRecords: React.Dispatch<React.SetStateAction<KintoneTypes.ExamTable[]>>;
  deleteRow: any;
}

interface DataType {
  key: React.Key,
  code: string,
  name: string,
  date: string,
  status: string,
  serialNum: string,
  memo: string,
  price: number | string,
  discount: number | string,
  subtotal: number | string,
  group: string,
  cb?: any
}

const canDelete = ['預開', '急開', '退單']

const columns: TableColumnsType<DataType> = [
  {
    title: '檢驗代碼',
    dataIndex: 'code'
  },
  {
    title: '檢驗名稱',
    dataIndex: 'name',
  },
  {
    title: '檢驗日期',
    dataIndex: 'date',
  },
  {
    title: '檢驗單狀態',
    dataIndex: 'status',
  },
  {
    title: '檢驗單號',
    dataIndex: 'serialNum',
  },
  {
    title: '檢驗備註',
    dataIndex: 'memo',
  },
  {
    title: '檢驗單價',
    dataIndex: 'price',
  },
  {
    title: '成數',
    dataIndex: 'discount',
  },
  {
    title: '檢驗費小計',
    dataIndex: 'subtotal',
  },
  {
    title: '',
    dataIndex: 'action',
    render: (_, record) => (
      <Button 
        type="primary" shape="circle" size="small"
        icon={<CloseOutlined />}
        onClick={record.cb || console.log('click (no input cb )')}
        disabled={!canDelete.includes(record.status)}
      />
    )
  }
]

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra)
}

const ExamTable: React.FC<Props> = ({ records, deleteRow }) => {
  const data: DataType[] = records?.map((record, index) => {
    const cell = record.value
    return {
      key: index,
      code: cell.檢驗代碼.value,
      name: cell.檢驗名稱.value,
      date: cell.檢驗日期.value,
      status: cell.檢驗單狀態.value,
      serialNum: cell.檢驗單號.value,
      memo: cell.檢驗備註.value,
      price: cell.檢驗單價.value,
      discount: cell.成數_檢驗.value,
      subtotal: cell.檢驗費小計.value,
      group: cell.分管組合.value,
      cb: () => {
        console.log('delete row:', index, cell.檢驗名稱.value)
        deleteRow(index)
      }
    }
  })
  
  return (
    <ConfigProvider theme={{
      components: {
        Table: {
          headerBg: '#3498db',
          headerColor: '#FFFFFF'
        },
        Button: {
          colorPrimary: '#3498db',
          colorPrimaryHover: 'red'
        }
      }
    }}>
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </ConfigProvider>
    
  )
}

export default ExamTable