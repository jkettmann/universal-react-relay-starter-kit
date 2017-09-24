import React from 'react'
import PropTypes from 'prop-types'
import { createFragmentContainer, graphql } from 'react-relay'
import styled from 'styled-components'
import Link from 'found/lib/Link'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

const messages = defineMessages({
  profile: { id: 'Navigation.User.Profile', defaultMessage: 'Profile' },
  createPost: { id: 'Navigation.User.CreatePost', defaultMessage: 'Create Post' },
  userPosts: { id: 'Navigation.User.Posts', defaultMessage: 'My Posts' },
  logout: { id: 'Navigation.User.Logout', defaultMessage: 'Logout' },
  login: { id: 'Navigation.User.Login', defaultMessage: 'Login' },
  posts: { id: 'Navigation.Posts', defaultMessage: 'Posts' },
})

const logout = () => {}

const AnonymousMenu = [
  { text: messages.login, to: '/login' },
]

const ReaderMenu = [
  { text: messages.profile, to: '/user' },
  { text: messages.logout, onClick: logout },
]

const PublisherMenu = [
  { text: messages.profile, to: '/user' },
  { text: messages.createPost, to: '/user/post/create' },
  { text: messages.userPosts, to: '/user/posts' },
  { text: messages.logout, onClick: logout },
]

const ContentMenu = [
  { text: messages.posts, to: '/posts' },
]

const Wrapper = styled.div`
  width: 400px;
  max-width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  padding-top: ${props => props.theme.size('navigationHeight')};
  display: flex;
  flex-direction: column;
  transform: translateX(-100%);
  background: ${props => props.theme.color.grey5};
  transition: transform ${props => props.theme.animation.default};
  z-index: ${props => props.theme.zIndex.navigation};

  &.open {
    transform: translateX(0);
  }
`

const NavigationItem = styled(Link)`
  width: 100%;
  padding: 12px 24px;
  text-decoration: none;
  font-size: 20px;
  color: ${props => props.theme.color.text}
`

const Divider = styled.div`
  height: 1px;
  width: 100%;
  margin: 8px 0;
  background: ${props => props.theme.color.grey4};
`

// TODO refactor onClick
const renderNavigationItems = (items, { intl, onItemClick }) =>
  items.map(({ text, to, onClick }) => (
    <NavigationItem
      key={to}
      to={to}
      onClick={() => { onClick(); onItemClick() }}
    >
      {intl.formatMessage(text)}
    </NavigationItem>
  ),
)

const NavigationMenu = ({ open, viewer, ...itemProps }) => (
  <Wrapper className={open && 'open'}>
    {!viewer.isLoggedIn && renderNavigationItems(AnonymousMenu, itemProps)}
    {viewer.isLoggedIn && !viewer.canPublish && renderNavigationItems(ReaderMenu, itemProps)}
    {viewer.canPublish && renderNavigationItems(PublisherMenu, itemProps)}

    <Divider />

    {renderNavigationItems(ContentMenu, itemProps)}
  </Wrapper>
)

NavigationMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
  onItemClick: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  viewer: PropTypes.object,
}

NavigationMenu.defaultProps = {
  viewer: {},
}

export default createFragmentContainer(
  injectIntl(NavigationMenu),
  graphql`
    fragment NavigationMenu_viewer on Viewer {
      isLoggedIn
      canPublish
    }
  `,
)
