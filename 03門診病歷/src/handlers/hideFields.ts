import { hideField, isMobile } from 'kchelper'
import { KintoneTypes } from '../dts/types'

const hideFields = (
  fieldCodes: (keyof KintoneTypes.Opd)[],
  event: KintoneTypes.E.Opd
) => {  
  fieldCodes.forEach(fieldCode => hideField(fieldCode, isMobile(event)))
}

export default hideFields