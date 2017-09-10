import React from 'react'
import PropTypes from 'prop-types'
import { createFragmentContainer, graphql } from 'react-relay'
import Link from 'found/lib/Link'
import AppBar from 'material-ui/AppBar'
import styled from 'styled-components'

import UserMenu from './HeaderUserMenu'

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`

const Header = ({ viewer, toggleNavigation }) => (
  <AppBar
    title={<StyledLink to="/">Relay Authentication</StyledLink>}
    onLeftIconButtonTouchTap={toggleNavigation}
    iconElementRight={<UserMenu viewer={viewer} />}
  />
)

Header.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  viewer: PropTypes.object,
  toggleNavigation: PropTypes.func.isRequired,
}

Header.defaultProps = {
  viewer: null,
}

export default createFragmentContainer(
  Header,
  graphql`
    fragment Header_viewer on Viewer {
      ...HeaderUserMenu_viewer
    }
  `,
)
