import React, { useState } from 'react'
import { Button, ConfigProvider } from 'antd'
import { KintoneTypes } from '../dts/types'
import { getDateString, getRecord, isMobile } from 'kchelper'
import ScheduleModal from './ScheduleModal'
import { getScheduleList } from '../api/schedule'
import { EventProvider } from './EventProvider'
import config from '../config'

interface Props {
  event: KintoneTypes.E.Appo;
}

const style: React.CSSProperties = {
  margin: '32px 8px 0 8px'
}

const OpdSearchButton: React.FC<Props> = ({ event }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [records, setRecords] = useState<KintoneTypes.Sch[]>([])
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndtDate] = useState<string>('')

  const getEndDate = (startDate: string) => {
    const endDate = new Date(startDate)
    endDate.setDate(endDate.getDate() + 30)
    return getDateString('yyyy-mm-dd', endDate)
  }

  const renderSchedule = async (startDate: string, endDate: string) => {
    setOpen(true)
    setLoading(true)

    const records = await getScheduleList(startDate, endDate)
    setRecords(records)
    setLoading(false)
  }

  const onClick = async () => {
    try {
      const record: KintoneTypes.Appo = getRecord(isMobile(event))
      const startDate = record.就診日期.value!
      setStartDate(startDate)

      // 編輯模式下，僅可列出原就診日期當天門診
      const endDate = config.events.edit.show.includes(event.type)
        ? startDate
        : getEndDate(startDate)
      setEndtDate(endDate)

      await renderSchedule(startDate, endDate)
    } catch (err) {
      console.error(err)
      window.alert('錯誤：無法取得門診表')
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <ConfigProvider theme={{
      components: {
        Button: { colorPrimary: '#3498db', colorPrimaryHover: '#1d6fa5' }
      }
    }}>
      <EventProvider event={event}>
        <Button type="primary" size="large" onClick={onClick} style={style}
          disabled={config.events.show.includes(event.type)}
        >
        搜尋門診
        </Button>
        <ScheduleModal 
          open={open} setOpen={setOpen}
          loading={loading} records={records}
          startDate={startDate} endDate={endDate}
        />
      </EventProvider>  
    </ConfigProvider>
  )
}

export default OpdSearchButton