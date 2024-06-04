import config from '../config'
import { KintoneTypes } from '../dts/types'

const calculateAge = (birthday: string | null) => {
  const birthDate = birthday? new Date(birthday) : new Date()
  const currentDate = new Date()
  
  let age = currentDate.getFullYear() - birthDate.getFullYear()
  const monthDifference = currentDate.getMonth() - birthDate.getMonth()

  // Adjust age if the person has not yet had their birthday this year
  if (
    monthDifference < 0
    || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())
  ) age--

  return age.toString()
}

const showAge = (event: KintoneTypes.E.Patient) => {
  const isIndex = event.type.includes('index')
  if (isIndex) {
    const records = event.records
    const els = kintone.app.getFieldElements(config.fc.patient.年齡)

    records?.forEach((record, index) => {
      const el = els![index]
      const birthday = record.生日.value
      const age = calculateAge(birthday)
      
      record.年齡.value = age      
      el.innerHTML = `<div><span>${age}</span></div>`
    })
    return event
  }

  const el = kintone.app.record.getFieldElement(config.fc.patient.年齡)
  const birthday = event.record!.生日.value
  const age = calculateAge(birthday)

  event.record!.年齡.value = age
  if (el) el.innerHTML = `<div><span>${age}</span></div>`
  
  return event
}

export default showAge