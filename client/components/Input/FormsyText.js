import { withProps } from 'recompose'
import { HOC } from 'formsy-react'

import TextInput from './TextInput'

const enhance = withProps(({ getValue, setValue, getErrorMessage }) => ({
  onChange: setValue,
  value: getValue(),
  error: getErrorMessage(),
}))

export default HOC(enhance(TextInput))
