import Swal from 'sweetalert2'
import { putEciStatus } from '../api/eci'
import { postReport } from '../api/report'
import { DataType } from '../components/ExamTable'
import { errToast } from '../utils/myToast'

const listDivStyle = `
  display: flex;
  flex-direction: column;
  align-items: start;
  line-height: 0.1em;
`

export const handleCheckin = async (rows: DataType[]) => {
  try {
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

export const handleReBarcode = async (rows: DataType[]) => {
  console.log('re-barcode:', rows)
}