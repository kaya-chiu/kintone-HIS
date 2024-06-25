import { ConfigProvider, Button } from 'antd'
import orderExam from '../handlers/orderExam'
import { errToast } from '../utils/myToast'
import { KintoneTypes } from '../dts/types'
import dayjs from 'dayjs'
import Swal from 'sweetalert2'
import { putOpdExamTable } from '../api/opd'
import { useState } from 'react'

interface Props {
  event: KintoneTypes.E.Opd;
}

const getUrgent = (table: KintoneTypes.ExamTable[]) => {
  const today = dayjs().format('YYYY-MM-DD')
  const urgent = table.filter(row => row.value.檢驗日期.value === today && row.value.檢驗單狀態.value === '急開')
  return urgent
}

const ExamOrderBtn: React.FC<Props> = ({ event }) => {
  const recordId = event.record!.$id.value
  const table = event.record!.檢驗.value
  const cn = event.record!.病歷號碼.value
  const opdId = event.record!.病歷記錄流水號.value
  const urgentInit = getUrgent(table)
  const [urgent, setUrgent] = useState<KintoneTypes.ExamTable[]>(urgentInit)

  return (
    <ConfigProvider theme={{
      components: {
        Button: { colorPrimary: '#3498db', colorPrimaryHover: '#1d6fa5' }
      }
    }}> 
      <Button size="middle" type="primary" style={{ margin: '32px 8px 0 8px' }}
        disabled={urgent.length === 0}
        onClick={() => {
          const urgentItems =  urgent.map(i => i.value.檢驗名稱.value).join('、')
          Swal.fire({
            title: '確定開單？',
            text: `項目：${urgentItems}（開立後將無法直接刪除項目）`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '確定',
            cancelButtonText: '取消',
            showLoaderOnConfirm: true,
            preConfirm: async () => {
              try {
                const res = await orderExam({ cn, opdId, rows: urgent, updateRows: setUrgent })
                if (!res.ok) {
                  return Swal.showValidationMessage(`
                    開單異常，請確認檢驗報到台：${res.err!}
                  `)
                }
                return res
              } catch (err) {
                Swal.showValidationMessage(`
                  開單異常，請確認檢驗報到台：${err}
                `)
              }
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then(async result => {
            if (result.isConfirmed) {
              await putOpdExamTable(recordId, table)
              Swal.fire({
                title: '抽血單已開',
                text: `項目：${urgentItems}`,
                icon: 'success',
                timer: 5000,
                timerProgressBar: true,
                allowOutsideClick: false
              }).then(() => location.reload())
            }
          }).catch(err => {
            errToast('檢驗表格更新失敗', err)
          })

        }}
      >
          急開單
      </Button>
    </ConfigProvider>
  )
}

export default ExamOrderBtn