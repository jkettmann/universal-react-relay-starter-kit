import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import styled from 'styled-components'

import TextField from '../../components/Input/TextField'
import ImageField from '../../components/Input/ImageField'
import Button from '../../components/Button'

const FormWrapper = styled.form`
  max-width: 600px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
`

const Form = ({ handleSubmit, valid }) => (
  <FormWrapper onSubmit={handleSubmit}>
    <TextField
      name="title"
      label="Title"
      validations="isWords"
      validationError="Please enter a title"
      fullWidth
      required
    />

    <TextField
      name="description"
      label="Description"
      validations="isWords"
      validationError="Please enter a description"
      fullWidth
      required
    />

    <ImageField
      label="Select Image"
      name="image"
      style={{ marginTop: 20 }}
      validations="isExisty"
      validationError="Please select an image"
      fullWidth
    />

    <Button
      type="submit"
      label="Save post"
      disabled={!valid}
      secondary
      fullWidth
    />
  </FormWrapper>
)

Form.propTypes = {
  valid: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default reduxForm({ form: 'createPost' })(Form)
