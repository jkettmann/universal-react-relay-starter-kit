import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers, withProps } from 'recompose'
import { SubmissionError, reduxForm } from 'redux-form'

import Box from '../Box'
import TextField from '../Input/TextField'
import Button from '../Button'
import RegisterMutation from '../../mutation/RegisterMutation'

import { ERRORS } from '../../../common/config'
import mapSubmitErrorsToFormErrors from '../../utils/mapSubmitErrorsToFormErrors'

const acceptedErrors = [
  { id: ERRORS.EmailAlreadyTaken, field: 'email', message: 'This email is already taken' },
]

const UserRegisterBox = ({ valid, handleSubmit, onClickLogin }) => (
  <Box>
    <Button
      label="Register with facebook"
      href="/facebook"
      external
      fullWidth
      secondary
    />

    <form onSubmit={handleSubmit}>
      <TextField
        name="email"
        label="E-Mail"
        validations="email"
        fullWidth
        required
      />

      <TextField
        name="password"
        type="password"
        label="Password"
        validations="password"
        validateImmediately
        fullWidth
        required
      />

      <TextField
        name="firstName"
        label="First Name"
        validations="letters"
        validationError="Please enter your first name"
        fullWidth
        required
      />

      <TextField
        name="lastName"
        label="Last Name"
        validations="letters"
        validationError="Please enter your last name"
        fullWidth
        required
      />

      <Button
        type="submit"
        label="Register"
        disabled={!valid}
        fullWidth
        secondary
      />
    </form>

    <Button
      label="Login"
      onClick={onClickLogin}
      fullWidth
      primary
    />
  </Box>
)

UserRegisterBox.propTypes = {
  valid: PropTypes.bool.isRequired,
  onClickLogin: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

const handlers = {
  register: ({ onRegisterSuccess }) => ({ email, password, firstName, lastName }) =>
    RegisterMutation.commit({ email, password, firstName, lastName })
      .then(() => onRegisterSuccess(email))
      .catch((errors) => {
        console.error('register', errors)
        const formErrors = mapSubmitErrorsToFormErrors(errors, acceptedErrors)
        throw new SubmissionError(formErrors)
      }),
}

const enhance = compose(
  withHandlers(handlers),
  withProps(({ register }) => ({ onSubmit: register })),
  reduxForm({ form: 'register' }),

)

export default enhance(UserRegisterBox)
