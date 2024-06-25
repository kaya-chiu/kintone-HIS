import Swal from 'sweetalert2'
import '../main.css'

export const errToast = (title: string, text: string) => {
  return Swal.fire({
    toast: true,
    position: 'top',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    icon: 'error',
    title: title || '錯誤',
    text: text || undefined
  })
}

export const sucToast = (title: string, text: string) => {
  return Swal.fire({
    toast: true,
    position: 'top',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    icon: 'success',
    title: title || '成功',
    text: text || undefined
  })
}

export const confirmToast = async (title: string, text: string) => {
  const result = await Swal.fire({
    title: title || '確定？',
    text: text || undefined,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '確定',
    cancelButtonText: '取消'
  })
  return result.isConfirmed
}