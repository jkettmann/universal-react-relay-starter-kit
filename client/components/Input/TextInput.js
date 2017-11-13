import React from 'react'
import { compose, withProps } from 'recompose'

import InputWrapper from './InputWrapper'
import Input from './Input'

const TextInput = props => (
  <InputWrapper {...props}>
    <Input {...props} />
  </InputWrapper>
)

const enhance = compose(
  withProps(({ input, meta, ...props }) => ({
    ...props,
    ...input,
    ...meta,
  })),
)

export default enhance(TextInput)
