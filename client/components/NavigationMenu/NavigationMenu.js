import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-relay'
import { connect } from 'react-redux'
import { fragment } from 'relay-compose'
import { compose, setPropTypes, withHandlers, withProps } from 'recompose'
import { defineMessages } from 'react-intl'

import Wrapper from './Wrapper'
import Divider from './Divider'
import NavigationItemList from '../NavigationItemList'

import { openLoginDialog as openLoginDialogAction } from '../Dialog/actions'
import LogoutMutation from '../../mutation/LogoutMutation'

const messages = defineMessages({
  profile: { id: 'Navigation.User.Profile', defaultMessage: 'Profile' },
  createPost: { id: 'Navigation.User.CreatePost', defaultMessage: 'Create Post' },
  userPosts: { id: 'Navigation.User.Posts', defaultMessage: 'My Posts' },
  logout: { id: 'Navigation.User.Logout', defaultMessage: 'Logout' },
  login: { id: 'Navigation.User.Login', defaultMessage: 'Login' },
  posts: { id: 'Navigation.Posts', defaultMessage: 'Posts' },
})

const createAnonymousMenuItems = ({ openLoginDialog }) => [
  { message: messages.login, onClick: openLoginDialog },
]

const createReaderMenuItems = ({ logout }) => [
  { message: messages.profile, to: '/user' },
  { message: messages.logout, onClick: logout },
]

const createPublisherMenuItems = ({ logout }) => [
  { message: messages.profile, to: '/user' },
  { message: messages.createPost, to: '/user/post/create' },
  { message: messages.userPosts, to: '/user/posts' },
  { message: messages.logout, onClick: logout },
]

const createCommonMenuItems = () => [
  { message: messages.posts, to: '/posts' },
]

const getUserMenuItems = (permission, handlers) => {
  if (!permission.isLoggedIn) {
    return createAnonymousMenuItems(handlers)
  }

  if (permission.isLoggedIn && !permission.canPublish) {
    return createReaderMenuItems(handlers)
  }

  return createPublisherMenuItems(handlers)
}

const NavigationMenu = ({ userMenuItems, commonMenuItems, open, closeNavigation }) => (
  <Wrapper className={open && 'open'}>
    <NavigationItemList
      items={userMenuItems}
      closeNavigation={closeNavigation}
    />

    <Divider />

    <NavigationItemList
      items={commonMenuItems}
      closeNavigation={closeNavigation}
    />
  </Wrapper>
)

const menuItemPropType = PropTypes.arrayOf(PropTypes.shape({
  message: PropTypes.shape({
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string.isRequired,
  }).isRequired,
  to: PropTypes.string,
  onClick: PropTypes.func,
}))

NavigationMenu.propTypes = {
  commonMenuItems: menuItemPropType.isRequired,
  userMenuItems: menuItemPropType.isRequired,
  open: PropTypes.bool.isRequired,
  closeNavigation: PropTypes.func.isRequired,
}

NavigationMenu.defaultProps = {
  permission: {},
}

const propTypes = {
  permission: PropTypes.shape({
    isLoggedIn: PropTypes.bool.isRequired,
    canPublish: PropTypes.bool.isRequired,
  }),
}

const mapDispatchToProps = (dispatch, { closeNavigation }) => ({
  openLoginDialog: () => {
    dispatch(openLoginDialogAction())
    closeNavigation()
  },
})

const handlers = withHandlers({
  logout: () => (event) => {
    event.preventDefault()
    event.stopPropagation()

    LogoutMutation.commit()
      .then((result) => {
        console.log('logout successful', result)
        // reload to clear relay store
        window.location.pathname = '/' // eslint-disable-line no-undef
      })
  },
})

const props = withProps(({ permission, openLoginDialog, logout }) => ({
  userMenuItems: getUserMenuItems(permission, { openLoginDialog, logout }),
  commonMenuItems: createCommonMenuItems(),
}))

const enhance = compose(
  setPropTypes(propTypes),
  fragment(graphql`
    fragment NavigationMenu_permission on Permission {
      isLoggedIn
      canPublish
    }
  `),
  connect(null, mapDispatchToProps),
  handlers,
  props,
)

export default enhance(NavigationMenu)
