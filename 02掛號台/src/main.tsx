import config from './config'
import autoLookupPatient from './handlers/autoLookupPatient'

// ** Events **
kintone.events.on(config.events.create.show, autoLookupPatient)
