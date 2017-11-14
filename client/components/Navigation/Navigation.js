import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-relay'
import { fragment } from 'relay-compose'
import { compose, withHandlers, withState } from 'recompose'

import Wrapper from './Wrapper'
import Link from './Link'
import NavigationIcon from '../NavigationIcon'
import UserIcon from './UserIcon'
import NavigationMenu from '../NavigationMenu'

const Navigation = ({ permission, isOpen, toggleOpen, close }) => (
  <Wrapper>
    <NavigationIcon onClick={toggleOpen} open={isOpen} />
    <Link to="/">Universal React Relay</Link>

    {permission.isLoggedIn && <UserIcon />}

    <NavigationMenu
      permission={permission}
      closeNavigation={close}
      open={isOpen}
    />
  </Wrapper>
)

Navigation.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  permission: PropTypes.object,
  // following are set with recompose
  isOpen: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
}

Navigation.defaultProps = {
  permission: null,
}

const state = withState('isOpen', 'setOpen', false)
const handlers = withHandlers({
  toggleOpen: ({ isOpen, setOpen }) => () => setOpen(!isOpen),
  close: ({ setOpen }) => () => setOpen(false),
})

const enhance = compose(
  fragment(graphql`
    fragment Navigation_permission on Permission {
      isLoggedIn
      ...NavigationMenu_permission
    }
  `),
  state,
  handlers,
)

export default enhance(Navigation)
