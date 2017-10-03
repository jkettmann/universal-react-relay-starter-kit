import React from 'react'
import PropTypes from 'prop-types'
import { createFragmentContainer, graphql } from 'react-relay'
import { defineMessages } from 'react-intl'

import Wrapper from './Wrapper'
import Divider from './Divider'
import NavigationItemList from '../NavigationItemList'

import { logout as logoutUser } from '../../auth'

const messages = defineMessages({
  profile: { id: 'Navigation.User.Profile', defaultMessage: 'Profile' },
  createPost: { id: 'Navigation.User.CreatePost', defaultMessage: 'Create Post' },
  userPosts: { id: 'Navigation.User.Posts', defaultMessage: 'My Posts' },
  logout: { id: 'Navigation.User.Logout', defaultMessage: 'Logout' },
  login: { id: 'Navigation.User.Login', defaultMessage: 'Login' },
  posts: { id: 'Navigation.Posts', defaultMessage: 'Posts' },
})

const logout = (event) => {
  event.preventDefault()
  event.stopPropagation()

  logoutUser().then((error) => {
    if (!error) {
      // redirect to home on success to reload all data
      // eslint-disable-next-line no-undef
      location.assign(`${location.protocol}//${location.host}`)
    }
  })
}

const anonymousMenuItems = [
  { message: messages.login, to: '/login' },
]

const readMenuItems = [
  { message: messages.profile, to: '/user' },
  { message: messages.logout, to: '/', onClick: logout },
]

const publisherMenuItems = [
  { message: messages.profile, to: '/user' },
  { message: messages.createPost, to: '/user/post/create' },
  { message: messages.userPosts, to: '/user/posts' },
  { message: messages.logout, to: '/', onClick: logout },
]

const contentMenuItems = [
  { message: messages.posts, to: '/posts' },
]

const NavigationMenu = ({ open, viewer, closeNavigation }) => (
  <Wrapper className={open && 'open'}>
    {
      !viewer.isLoggedIn && (
        <NavigationItemList
          items={anonymousMenuItems}
          closeNavigation={closeNavigation}
        />
      )
    }

    {
      viewer.isLoggedIn && !viewer.canPublish && (
        <NavigationItemList
          items={readMenuItems}
          closeNavigation={closeNavigation}
        />
      )
    }

    {
      viewer.canPublish && (
        <NavigationItemList
          items={publisherMenuItems}
          closeNavigation={closeNavigation}
        />
      )
    }

    <Divider />

    <NavigationItemList
      items={contentMenuItems}
      closeNavigation={closeNavigation}
    />
  </Wrapper>
)

NavigationMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  closeNavigation: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  viewer: PropTypes.object,
}

NavigationMenu.defaultProps = {
  viewer: {},
}

export default createFragmentContainer(
  NavigationMenu,
  graphql`
    fragment NavigationMenu_viewer on Viewer {
      isLoggedIn
      canPublish
    }
  `,
)
