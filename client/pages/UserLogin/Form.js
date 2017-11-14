import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'

import TextField from '../../components/Input/TextField'
import Button from '../../components/Button'

const Form = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <TextField
      name="email"
      label="E-Mail"
      validations="isEmail"
      validationError="Please enter a valid email address"
      fullWidth
    />

    <TextField
      type="password"
      name="password"
      label="Passwort"
      fullWidth
    />

    <Button
      type="submit"
      label="Login"
      fullWidth
      secondary
    />
  </form>
)

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default reduxForm({ form: 'login' })(Form)
