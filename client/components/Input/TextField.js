import { compose, setDisplayName, withProps } from 'recompose'
import { Field } from 'redux-form'

import TextInput from './TextInput'

const enhance = compose(
  setDisplayName('TextField'),
  withProps(() => ({
    component: TextInput,
  })),
)

export default enhance(Field)
