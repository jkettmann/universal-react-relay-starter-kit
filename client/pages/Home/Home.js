import React from 'react'
import PropTypes from 'prop-types'
import { createFragmentContainer, graphql } from 'react-relay'
import { compose, flattenProp } from 'recompose'

import Wrapper from './Wrapper'

const HomePage = ({ isLoggedIn }) => (
  <Wrapper>
    <h1>Universal React Relay Starter Kit</h1>

    <div>
      You are currently {!isLoggedIn && 'not'} logged in.
    </div>
  </Wrapper>
)

HomePage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
}

const enhance = compose(
  flattenProp('data'),
  flattenProp('permission'),
)

export default createFragmentContainer(
  enhance(HomePage),
  graphql`
    fragment Home on Query {
      permission {
        isLoggedIn
      }
    }
  `,
)
