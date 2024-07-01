import { KintoneTypes } from '../dts/types'
import { Table, ConfigProvider, Flex, Button, Input, DatePicker } from 'antd'
import type { TableColumnsType } from 'antd'
import type { SearchProps } from 'antd/es/input/Search'
import { useEffect, useState } from 'react'
import { getEciRecords } from '../api/eci'
import dayjs, { Dayjs } from 'dayjs'
import { errToast } from '../utils/myToast'

const { Search } = Input
const { RangePicker } = DatePicker
const baseUrl = import.meta.env.VITE_ECI_SHOW_URL

// * Types
type DateRange = [Dayjs | null, Dayjs | null]
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
const EciPage: React.FC = () => {
  const [records, setRecords] = useState<KintoneTypes.ECI[]>([])
  const [selected, setSelected] = useState<DataType[]>([])
  const [value, setValue] = useState('')
  const [dateRange, setDateRange] = useState<DateRange>([dayjs(), dayjs()])

  const rowSelection = {
    onChange: (_: React.Key[], selectedRows: DataType[]) => {
      setSelected(selectedRows)
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.status !== '已開單', 
    })
  }

  const onSearch: SearchProps['onSearch'] = async (value, _e, info) => {
    if (info?.source !== 'input') return
    console.log('search')
    const result = await serchEciRecords(value, dateRange)
    setRecords(result)
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
    <div style={{ padding: '20px' }}>
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
          <RangePicker
            size="large"
            placeholder={['起始日', '結束日']}
            value={dateRange}
            onCalendarChange={e => setDateRange(e)}
          />
          <Search 
            addonBefore="病歷號碼"
            placeholder="請輸入病歷號碼"
            allowClear onSearch={onSearch}
            value={value}
            onChange={e => setValue(e.target.value)}
            style={{ maxWidth: 300, margin: '10px 20px 10px 0' }}
            size="large"
          />
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
    </div>
  )
}
export default EciPage

// ** Functions ** //
async function serchEciRecords(cn: string, dateRange: DateRange) {
  const startDate = dateRange[0]?.format('YYYY-MM-DD') || dayjs().format('YYYY-MM-DD')
  const endDate = dateRange[1]?.format('YYYY-MM-DD') || startDate
  const result = await getEciRecords({ cn, startDate, endDate})
  return result
}

async function handleCheckin (rows: DataType[]) {
  try {
    const Swal = (await import('sweetalert2')).default
    const postReport = (await import('../api/report')).postReport
    const putEciStatus = (await import('../api/eci')).putEciStatus

    const listDivStyle = `
      display: flex;
      flex-direction: column;
      align-items: start;
      line-height: 0.1em;
    `
    let list = ''
    rows.forEach(r => list += `<p>➤【${r.cn}】${r.exam}（${r.barcode}）</p>`)
    Swal.fire({
      title: '確定報到？',
      html: `<div style="${listDivStyle}">${list}</div>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          await postReport(rows)
          await putEciStatus(rows)
        } catch (err) {
          Swal.showValidationMessage(`
            發生錯誤：${err}
          `)
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then(async result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '報到成功',
          icon: 'success',
          timer: 5000,
          timerProgressBar: true,
          allowOutsideClick: false
        }).then(() => location.reload())
      }
    }).catch(err => {
      errToast('檢驗表格更新失敗', err)
    })
  } catch (err) {
    errToast('報到失敗', err as string)
  }
}

async function handleReBarcode (rows: DataType[]) {
  console.log('re-barcode:', rows)
}