import React, { useState } from 'react'
import { Input, DatePicker } from 'antd'
import type { SearchProps } from 'antd/es/input/Search'
import { KintoneTypes } from '../dts/types'
import dayjs, { Dayjs } from 'dayjs'
import { getEciRecords } from '../api/eci'

const { Search } = Input
const { RangePicker } = DatePicker

interface Props {
  setRecords: React.Dispatch<React.SetStateAction<KintoneTypes.ECI[]>>
}
type DateRange = [Dayjs | null, Dayjs | null]

// *** MAIN COMPONENT ***
const SearchBar: React.FC<Props> = ({ setRecords }) => {
  const [value, setValue] = useState('')
  const [dateRange, setDateRange] = useState<DateRange>([dayjs(), dayjs()])

  const onSearch: SearchProps['onSearch'] = async (value, _e, info) => {
    if (info?.source !== 'input') return
    const startDate = dateRange[0]?.format('YYYY-MM-DD') || dayjs().format('YYYY-MM-DD')
    const endDate = dateRange[1]?.format('YYYY-MM-DD') || startDate

    const result = await getEciRecords({ cn: value, startDate, endDate})
    setRecords(result)
  }

  return (
    <>
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
    </>
    
  )
}

export default SearchBar