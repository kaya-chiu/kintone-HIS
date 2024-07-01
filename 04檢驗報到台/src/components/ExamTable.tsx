import { KintoneTypes } from '../dts/types'
import { Table, ConfigProvider, Flex, Button } from 'antd'
import type { TableColumnsType } from 'antd'
import { useEffect, useState } from 'react'
import { getEciRecords } from '../api/eci'
import SearchBar from './SearchBar'
import { handleCheckin, handleReBarcode } from '../handlers/checkin'

interface Props {
  event?: KintoneTypes.E.ECI;
}
export interface DataType {
  key: React.Key,
  date: string,
  cn: string,
  name: string,
  exam: string,
  status: string | null | undefined,
  barcode: string,
  serialNum: string,
  orderedFrom: string,
  canceledFrom: string | null | undefined,
  recordId: string,
  code: string,
  group: string
}

const baseUrl = import.meta.env.VITE_ECI_SHOW_URL

// * 表格設定
const columns: TableColumnsType<DataType> = [
  { 
    title: '檢驗日期',
    dataIndex: 'date',
    sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    showSorterTooltip: false
  },
  { 
    title:'病歷號碼',
    dataIndex: 'cn',
    sorter: (a, b) => Number(a.cn) - Number(b.cn),
    showSorterTooltip: false
  },
  { title: '姓名', dataIndex: 'name' },
  { title: '檢驗名稱', dataIndex: 'exam' },
  {
    title: '狀態',
    dataIndex: 'status',
    filters: [
      { text: '已開單', value: '已開單' },
      { text: '已抽', value: '已抽' },
      { text: '取消', value: '取消' }
    ],
    filterMode: 'menu',
    defaultFilteredValue: ['已開單'],
    onFilter: (value, record) => record.status!.startsWith(value as string)
  },
  { title: '條碼號', dataIndex: 'barcode' },
  {
    title: '檢驗單號',
    dataIndex: 'serialNum',
    render: (text, record) => <a href={`${baseUrl}#record=${record.recordId}`}>{text}</a>
  },
  { title: '開單記錄', dataIndex: 'orderedFrom' },
  { title: '退單記錄', dataIndex: 'canceledFrom' },
]

// ** MAIN COMPONENT ** //
const ExamTable: React.FC<Props> = () => {
  const [records, setRecords] = useState<KintoneTypes.ECI[]>([])
  const [selected, setSelected] = useState<DataType[]>([])

  const rowSelection = {
    onChange: (_: React.Key[], selectedRows: DataType[]) => {
      setSelected(selectedRows)
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.status !== '已開單', 
    })
  }

  // ** 產生表格列 **
  const data: DataType[] = records.map((r, index) => ({
    key: index,
    date: r.檢驗日期.value!,
    cn: r.病歷號碼.value,
    name: r.姓名.value,
    exam: r.檢驗名稱.value,
    status: r.狀態.value,
    barcode: r.條碼號.value,
    serialNum: r.檢驗單號.value,
    orderedFrom: r.開單記錄.value,
    canceledFrom: r.退單記錄.value,
    recordId: r.$id.value,
    code: r.檢驗代碼.value,
    group: r.分管組合.value
  }))

  useEffect(() => {
    (async () => {
      const result = await getEciRecords()
      setRecords(result)
    })()
  }, [])

  return (
    <ConfigProvider theme={{
      components: {
        Table: {
          headerBg: '#3498db',
          headerColor: '#FFFFFF',
          headerSortActiveBg: 'rgba(52, 152, 219, 0.9)',
          headerSortHoverBg: 'rgba(52, 152, 219, 0.9)'
        },
        Button: {
          colorPrimary: '#3498db',
          colorPrimaryHover: '#1d6fa5' 
        }
      }
    }}>
      <Flex gap="small" align="center">
        <SearchBar setRecords={setRecords}/>
        <Button size="large" onClick={() => handleCheckin(selected)}>檢驗報到</Button>
        <Button size="large" onClick={() => handleReBarcode(selected)}>重給條碼號</Button>
      </Flex>
      <Table
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    </ConfigProvider>
  )
}

export default ExamTable