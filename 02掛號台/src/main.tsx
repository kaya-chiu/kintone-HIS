import config from './config'
import autoId from './handlers/autoId'
import autoLookupPatient from './handlers/autoLookupPatient'
import disabledField from './handlers/disabledField'

// ** Events **
// 禁止編輯欄位
kintone.events.on(config.events.all.show, event => {
  disabledField(['掛號流水號', '門診表記錄號碼', '看診序號'], event)
  return event
})
kintone.events.on(config.events.create.show, autoLookupPatient)

kintone.events.on(config.events.create.submit, autoId)