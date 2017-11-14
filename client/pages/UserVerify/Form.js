import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import styled from 'styled-components'

import TextField from '../../components/Input/TextField'
import Button from '../../components/Button'

const FormWrapper = styled.form`
  width: 320px;
  margin-left: auto;
  margin-right: auto;
`

const Form = ({ valid, handleSubmit }) => (
  <FormWrapper onSubmit={handleSubmit}>
    <TextField
      name="email"
      label="E-Mail"
      validations="email"
      fullWidth
      required
    />

    <TextField
      name="pin"
      label="Verification PIN"
      validations="number"
      validateImmediately
      fullWidth
      required
    />

    <Button
      type="submit"
      label="Verifiy"
      disabled={!valid}
      fullWidth
      secondary
    />
  </FormWrapper>
)

Form.propTypes = {
  valid: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default reduxForm({ form: 'verifyEmail' })(Form)
