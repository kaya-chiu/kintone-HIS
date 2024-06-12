import React from 'react'
import { Table, Button } from 'antd'
import type { TableColumnsType, TableProps } from 'antd'
import { KintoneTypes } from '../dts/types'
import { getRecord, isMobile, setRecord } from 'kchelper'

interface Props {
  records: KintoneTypes.Sch[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DataType {
  key: React.Key,
  date: string,
  week: string,
  timeSlot: string,
  clinic: string,
  doctor: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cb: any
}

const columns: TableColumnsType<DataType> = [
  {
    title: '日期',
    dataIndex: 'date'
  },
  {
    title: '星期',
    dataIndex: 'week',
    filters: [
      { text: '一', value: '一' },
      { text: '二', value: '二' },
      { text: '三', value: '三' },
      { text: '四', value: '四' },
      { text: '五', value: '五' },
      { text: '六', value: '六' },
    ],
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) => record.week.startsWith(value as string),
  },
  {
    title: '門診時段',
    dataIndex: 'timeSlot',
    filters: [
      { text: '早診', value: '早診' },
      { text: '午診', value: '午診' },
      { text: '晚診', value: '晚診' },
    ],
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) => record.timeSlot.startsWith(value as string),
  },
  {
    title: '門診別',
    dataIndex: 'clinic',
    filters: [
      { text: '一診', value: '一診' },
      { text: '二診', value: '二診' },
    ],
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) => record.clinic.startsWith(value as string),
  },
  {
    title: '看診醫師',
    dataIndex: 'doctor',
    filters: [
      { text: 'Administrator', value: 'Administrator' },
      { text: 'Sophia', value: 'sophia' },
      { text: 'Emerson', value: 'emerson' },
    ],
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) => record.doctor.startsWith(value as string),
  },
  {
    title: '',
    dataIndex: 'action',
    render: (_, record) => (
      <Button type="primary" onClick={record.cb}>選擇</Button>
    )
  }
]

// const dummyData: DataType[] = [
//   {
//     key: '1',
//     date: '2024-06-11',
//     week: '二',
//     timeSlot: '早診',
//     clinic: '一診',
//     doctor: 'Administrator'
//   },
//   {
//     key: '2',
//     date: '2024-06-11',
//     week: '二',
//     timeSlot: '晚診',
//     clinic: '二診',
//     doctor: 'Administrator'
//   },
//   {
//     key: '3',
//     date: '2024-06-12',
//     week: '三',
//     timeSlot: '早診',
//     clinic: '一診',
//     doctor: 'Administrator'
//   },
// ]

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra)
}

const ScheduleTable: React.FC<Props> = ({ records, setOpen }) => {
  const data: DataType[] = records?.map((record, index) => {
    return {
      key: index,
      date: record.日期.value!,
      week: record.星期.value!,
      timeSlot: record.門診時段.value!,
      clinic: record.門診別.value!,
      doctor: `${record.看診醫師.value[0].name}${record.代診.value.includes('代診') ? '（代診）' : ''}`,
      cb: (event: KintoneTypes.E.Appo) => {
        const appo: KintoneTypes.Appo = getRecord(isMobile(event))
        appo.就診日期.value = record.日期.value
        appo.門診時段.value = record.門診時段.value
        appo.門診別.value = record.門診別.value
        appo.看診醫師.value = record.看診醫師.value
        setRecord(appo, isMobile(event))
        setOpen(false)
      }
    }
  })
  return (
    <Table columns={columns} dataSource={data} onChange={onChange} />
  )
}

export default ScheduleTable