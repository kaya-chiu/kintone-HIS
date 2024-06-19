import { KintoneTypes } from '../dts/types'

const drugCount = (dose: number, freq: KintoneTypes.Freq, day: number) => {
  let perDay = 1
  switch (freq) {
  case 'BID':
    perDay = 2
    break
  case 'TID':
    perDay = 3
    break
  case 'QID':
    perDay = 4
    break
  case 'QOD':
    perDay = 0.5
    break
  case 'Q3D':
    perDay = 1/3
    break
  case 'QW':
    perDay = 1/7
    break
  case 'BIW':
    perDay = 1/14
    break
  default:
    perDay = 1
    break
  }

  return Math.ceil(dose * perDay * day)
}

export default drugCount