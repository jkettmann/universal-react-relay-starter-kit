import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-relay'
import { fragment } from 'relay-compose'
import { compose, flattenProp } from 'recompose'

import Wrapper from './Wrapper'

const Profile = ({ firstName, lastName, email }) => (
  <Wrapper>
    <h2>Your Account</h2>
    <div>{firstName} {lastName}</div>
    <div>{email}</div>
  </Wrapper>
)

Profile.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
}

const enhance = compose(
  fragment(graphql`
    fragment UserProfile on Query {
      user {
        firstName
        lastName
        email
      }
    }
  `),
  flattenProp('data'),
  flattenProp('user'),
)

export default enhance(Profile)
