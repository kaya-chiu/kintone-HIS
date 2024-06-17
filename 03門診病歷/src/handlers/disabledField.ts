import { KintoneTypes } from '../dts/types'

const disabledField = (
  fieldCodes: (keyof KintoneTypes.Opd)[],
  event: KintoneTypes.E.Opd
) => {
  fieldCodes.forEach(fieldCode => event.record![fieldCode].disabled = true)
}

export default disabledField