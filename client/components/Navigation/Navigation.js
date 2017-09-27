import React from 'react'
import PropTypes from 'prop-types'
import { createFragmentContainer, graphql } from 'react-relay'
import Link from 'found/lib/Link'
import styled from 'styled-components'

import NavigationIcon from './NavigationIcon'
import UserIcon from '../Icons/UserIcon'
import NavigationMenu from './NavigationMenu'

const StyledLink = styled(Link)`
  flex: 1;
  text-decoration: none;
  color: ${props => props.theme.color.textAlternate};
`

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: ${props => props.theme.size('navigationHeight')};
  z-index: ${props => props.theme.zIndex.navigationBar};
  display: flex;
  align-items: center;
  padding-left: 24px;
  padding-right: 24px;
  background: ${props => props.theme.color.primary};
  font-size: 24px;
  font-weight: 400;
`

const StyledUserIcon = styled(UserIcon)`
  fill: ${props => props.theme.color.textAlternate};
`
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
        <StyledLink to="/">Universal React Relay</StyledLink>

        {viewer.isLoggedIn && <StyledUserIcon />}

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
