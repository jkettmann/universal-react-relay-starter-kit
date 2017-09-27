import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { createFragmentContainer, graphql } from 'react-relay'

const Wrapper = styled.div`
  margin-top: 20px;
  text-align: center;
`

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
