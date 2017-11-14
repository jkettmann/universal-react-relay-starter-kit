import { compose, setDisplayName, withHandlers, withProps } from 'recompose'
import { Field } from 'redux-form'

import TextInput from './TextInput'
import createValidator from './createValidator'

const enhance = compose(
  setDisplayName('TextField'),
  withHandlers({ validate: createValidator }),
  withProps(() => ({
    component: TextInput,
  })),
)

export default enhance(Field)
