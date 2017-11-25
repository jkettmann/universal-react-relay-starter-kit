import { combineReducers } from 'redux'
import found from 'found/lib/foundReducer'
import { reducer as form } from 'redux-form'

import dialog from '../components/Dialog/reducer'

export default combineReducers({
  found,
  form,
  dialog,
})
