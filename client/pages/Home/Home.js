import React from 'react'
import PropTypes from 'prop-types'
import { createFragmentContainer, graphql } from 'react-relay'

import Wrapper from './Wrapper'

const HomePage = ({ viewer }) => (
  <Wrapper>
    <h1>Universal React Relay Starter Kit</h1>

    <div>
      You are currently {!viewer.isLoggedIn && 'not'} logged in.
    </div>
  </Wrapper>
)

HomePage.propTypes = {
  viewer: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
  }).isRequired,
}

export default createFragmentContainer(
  HomePage,
  graphql`
    fragment Home_viewer on Viewer {
      isLoggedIn
    }
  `,
)
