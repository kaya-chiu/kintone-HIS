import React from 'react'
import { Modal } from 'antd'
import { KintoneTypes } from '../dts/types'

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  data: KintoneTypes.ECI[];
  index: number | undefined;
  handleTableInput: (input: {
    rowIndex: number,
    colName: keyof KintoneTypes.ExamField,
    inputValue: string
  }) => void;
}

// *** MAIN COMPONENT ***
const ExamModal: React.FC<Props> = ({ open, setOpen, loading, data, index, handleTableInput }) => {
  if (!index) return

  // * RETURN
  return (
    <Modal
      title="檢驗單號搜尋"
      loading={loading}
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      width={600}
    >
      { 
        data?.length > 0
          ? data.map(r => (
            <a onClick={() => {
              handleTableInput({ rowIndex: index, colName: '檢驗單號', inputValue: r.檢驗單號.value })
              setOpen(false)
            }}>
              <p>➤ {r.檢驗名稱.value}（檢驗單號：{r.檢驗單號.value}）</p>
            </a>
          ))
          : <p>查無資料</p>
      }
    </Modal>
  )
}

export default ExamModal