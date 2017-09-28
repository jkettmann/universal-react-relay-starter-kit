import React from 'react'
import PropTypes from 'prop-types'
import { createFragmentContainer, graphql } from 'react-relay'
import { defineMessages } from 'react-intl'

import Wrapper from './Wrapper'
import Divider from './Divider'
import NavigationItemList from '../NavigationItemList'

const messages = defineMessages({
  profile: { id: 'Navigation.User.Profile', defaultMessage: 'Profile' },
  createPost: { id: 'Navigation.User.CreatePost', defaultMessage: 'Create Post' },
  userPosts: { id: 'Navigation.User.Posts', defaultMessage: 'My Posts' },
  logout: { id: 'Navigation.User.Logout', defaultMessage: 'Logout' },
  login: { id: 'Navigation.User.Login', defaultMessage: 'Login' },
  posts: { id: 'Navigation.Posts', defaultMessage: 'Posts' },
})

const logout = () => {}

const anonymousMenuItems = [
  { messageId: messages.login, to: '/login' },
]

const readMenuItems = [
  { messageId: messages.profile, to: '/user' },
  { messageId: messages.logout, onClick: logout },
]

const publisherMenuItems = [
  { messageId: messages.profile, to: '/user' },
  { messageId: messages.createPost, to: '/user/post/create' },
  { messageId: messages.userPosts, to: '/user/posts' },
  { messageId: messages.logout, onClick: logout },
]

const contentMenuItems = [
  { messageId: messages.posts, to: '/posts' },
]

const NavigationMenu = ({ open, viewer, onItemClick }) => (
  <Wrapper className={open && 'open'}>
    {
      !viewer.isLoggedIn && (
        <NavigationItemList
          items={anonymousMenuItems}
          onItemClick={onItemClick}
        />
      )
    }

    {
      viewer.isLoggedIn && !viewer.canPublish && (
        <NavigationItemList
          items={readMenuItems}
          onItemClick={onItemClick}
        />
      )
    }

    {
      viewer.canPublish && (
        <NavigationItemList
          items={publisherMenuItems}
          onItemClick={onItemClick}
        />
      )
    }

    <Divider />

    <NavigationItemList
      items={contentMenuItems}
      onItemClick={onItemClick}
    />
  </Wrapper>
)

NavigationMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  onItemClick: PropTypes.func.isRequired,
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
