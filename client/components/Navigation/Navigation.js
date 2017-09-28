import React from 'react'
import PropTypes from 'prop-types'
import { createFragmentContainer, graphql } from 'react-relay'

import Wrapper from './Wrapper'
import Link from './Link'
import NavigationIcon from '../NavigationIcon'
import UserIcon from './UserIcon'
import NavigationMenu from '../NavigationMenu'

class Navigation extends React.PureComponent {
  state = {
    navigationOpen: false,
  }

  toggleNavigation = () => {
    this.setState({ navigationOpen: !this.state.navigationOpen })
  }

  closeNavigation = () => {
    this.setState({ navigationOpen: false })
  }

  render() {
    const { viewer } = this.props
    const { navigationOpen } = this.state
    return (
      <Wrapper>
        <NavigationIcon onClick={this.toggleNavigation} open={navigationOpen} />
        <Link to="/">Universal React Relay</Link>

        {viewer.isLoggedIn && <UserIcon />}

        <NavigationMenu
          viewer={viewer}
          onItemClick={this.closeNavigation}
          open={navigationOpen}
        />
      </Wrapper>
    )
  }
}

Navigation.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  viewer: PropTypes.object,
}

Navigation.defaultProps = {
  viewer: null,
}

export default createFragmentContainer(
  Navigation,
  graphql`
    fragment Navigation_viewer on Viewer {
      isLoggedIn
      ...NavigationMenu_viewer
    }
  `,
)
