import React from 'react'
import { graphql } from 'react-relay'
import Route from 'found/lib/Route'
import RedirectException from 'found/lib/RedirectException'
import makeRouteConfig from 'found/lib/makeRouteConfig'
import universal from 'react-universal-component'

import App from './components/App'
import Loading from './components/Loading'

export const paths = {
  unauthorized: '/unauthorized',
}

const POST_COUNT = 6

const appQuery = graphql`query Routes_App_Query { viewer { ...App_viewer } }`
const homeQuery = graphql`query Routes_Home_Query { viewer { ...Home_viewer } }`
const postsQuery = graphql`query Routes_Posts_Query ($afterCursor: String, $count: Int!) { viewer { ...Posts_viewer } }`
const postDetailQuery = graphql`query Routes_PostDetails_Query ($postId: String!) { viewer { ...PostDetails_viewer } }`
const loginQuery = graphql`query Routes_Login_Query { viewer { ...UserLogin_viewer } }`
const registerQuery = graphql`query Routes_Register_Query { viewer { ...UserRegister_viewer } }`
const userProfileQuery = graphql`query Routes_Profile_Query { viewer { ...UserProfile_viewer } }`
const userPostsQuery = graphql`query Routes_UserPosts_Query ($afterCursor: String, $count: Int!) { viewer { ...UserPosts_viewer } }`
const createPostQuery = graphql`query Routes_CreatePost_Query { viewer { canPublish, ...UserCreatePost_viewer } }`

const getPage = props => import(`./async/${props.page}`)

const UniversalComponent = universal(getPage, {
  loading: Loading,
})

// eslint-disable-next-line react/prop-types
const createRender = (page, authorizationFlag) => ({ props }) => {
  if (authorizationFlag && !props) {
    return null
  }
  // eslint-disable-next-line react/prop-types
  if (authorizationFlag && props && props.viewer && !props.viewer[authorizationFlag]) {
    throw new RedirectException(paths.unauthorized)
  }

  return <UniversalComponent page={page} {...props} isLoading={!props} />
}

export default makeRouteConfig(
  <Route
    path="/"
    Component={App}
    query={appQuery}
  >
    <Route
      render={createRender('HomePage')}
      query={homeQuery}
    />

    <Route
      path="/posts"
      render={createRender('PostsPage')}
      query={postsQuery}
      prepareVariables={params => ({
        ...params,
        count: POST_COUNT,
        afterCursor: null,
      })}
    />

    <Route
      path="/post/:postId"
      render={createRender('PostDetailsPage')}
      query={postDetailQuery}
    />

    <Route
      path="/login"
      render={createRender('UserLoginPage')}
      query={loginQuery}
    />

    <Route
      path={paths.unauthorized}
      render={createRender('UserLoginPage')}
      query={loginQuery}
    />

    <Route
      path="/register"
      render={createRender('UserRegisterPage')}
      query={registerQuery}
    />

    <Route
      path="/user"
      render={createRender('UserProfilePage')}
      query={userProfileQuery}
    />

    <Route
      path="/user/posts"
      render={createRender('UserPostsPage')}
      query={userPostsQuery}
      prepareVariables={params => ({
        ...params,
        count: POST_COUNT,
        afterCursor: null,
      })}
    />

    <Route
      path="/user/post/create"
      render={createRender('UserCreatePostPage', 'canPublish')}
      query={createPostQuery}
    />
  </Route>,
)
