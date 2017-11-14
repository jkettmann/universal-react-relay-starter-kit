import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-relay'
import { fragment } from 'relay-compose'
import { compose, flattenProp, withHandlers } from 'recompose'
import { SubmissionError } from 'redux-form'

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
  register: ({ router }) => ({ email, password, firstName, lastName }) =>
    RegisterMutation.commit({ email, password, firstName, lastName })
      .then((result, errors) => {
        if (!errors) {
          router.push(`/verify/${email}`)
          return
        }

        console.error('register', errors)
        // const formError = {}
        // switch (errors[0]) {
        //   case ERRORS.EmailAlreadyTaken:
        //     formError.email =
        //       'This email address is already taken.'
        //     break
        //   default:
        //     break
        // }
        throw new SubmissionError(errors[0])
      }),
}

const enhance = compose(
  fragment(graphql`
    fragment UserRegister on Query {
      permission {
        isLoggedIn
      }
    }
  `),
  withHandlers(handlers),
  flattenProp('data'),
  flattenProp('permission'),
)

export default enhance(UserRegisterPage)
