import React from 'react'
import PropTypes from 'prop-types'
import { createFragmentContainer, graphql } from 'react-relay'
import { compose, flattenProp, withHandlers } from 'recompose'

import Wrapper from './Wrapper'
import FormWrapper from './FormWrapper'
import Button from '../../components/Button'
import Form from './Form'
import RegisterMutation from '../../mutation/RegisterMutation'

import { ERRORS } from '../../../common/config'

const UserRegisterPage = ({ register }) => (
  <Wrapper>
    <h2>Register</h2>

    <FormWrapper>
      <Button
        label="Register with facebook"
        href="/facebook"
        external
        fullWidth
        secondary
      />

      <Form onSubmit={register} />

      <Button
        label="Login"
        to="/login"
        fullWidth
        primary
      />
    </FormWrapper>
  </Wrapper>
)

UserRegisterPage.propTypes = {
  register: PropTypes.func.isRequired,
}

const handlers = {
  register: ({ relay, router }) => ({ email, password, firstName, lastName }) => {
    const environment = relay.environment

    RegisterMutation.commit({
      environment,
      input: { email, password, firstName, lastName },
      onCompleted: (result, errors) => {
        if (!errors) {
          router.push('/login')
          return
        }

        console.error('register', errors)
        const formError = {}
        switch (errors[0]) {
          case ERRORS.EmailAlreadyTaken:
            formError.email =
              'This email address is already taken.'
            break
          default:
            break
        }
        this.formElement.updateInputsWithError(formError)
      },
      onError: (error) => console.error('Registration Failed', error),
    })
  },
}

const enhance = compose(
  withHandlers(handlers),
  flattenProp('data'),
  flattenProp('permission'),
)

export default createFragmentContainer(
  enhance(UserRegisterPage),
  graphql`
    fragment UserRegister on Query {
      permission {
        isLoggedIn
      }
    }
  `,
)
