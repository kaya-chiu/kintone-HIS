import React from 'react'
import { Modal } from 'antd'
import ScheduleTable from './ScheduleTable'
import { KintoneTypes } from '../dts/types'

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  records: KintoneTypes.Sch[];
  startDate: string;
  endDate: string;
}

const ScheduleModal: React.FC<Props> = ({ open, setOpen, loading, records, startDate, endDate }) => {
  
  return (
    <Modal
      title={<p>門診表 {startDate && endDate ? `【${startDate} ~ ${endDate}】` : ''}</p>}
      loading={loading}
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      width={1000}
    >
      <ScheduleTable records={records} setOpen={setOpen} />
    </Modal>
  )
}

export default ScheduleModal