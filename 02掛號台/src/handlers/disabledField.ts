import { KintoneTypes } from '../dts/types'

const disabledField = (
  fieldCodes: (keyof KintoneTypes.Appo)[],
  event: Event
) => {
  //@ts-expect-error: event.record.field.disabled
  fieldCodes.forEach(fieldCode => event.record![fieldCode].disabled = true)
}

export default disabledField