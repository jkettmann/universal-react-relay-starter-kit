import React from 'react'
import { graphql } from 'react-relay'
import Route from 'found/lib/Route'
import makeRouteConfig from 'found/lib/makeRouteConfig'
import universal from 'react-universal-component'

import App from '../components/App'

const POST_COUNT = 6

const appQuery = graphql`query Routes_App_Query { viewer { ...App_viewer } }`
const homeQuery = graphql`query Routes_Home_Query { viewer { ...Home_viewer } }`
const postsQuery = graphql`query Routes_Posts_Query ($afterCursor: String, $count: Int!) { viewer { ...Posts_viewer } }`
const postDetailQuery = graphql`query Routes_PostDetail_Query ($postId: String!) { viewer { ...PostDetail_viewer } }`
const loginQuery = graphql`query Routes_Login_Query { viewer { ...Login_viewer } }`
const registerQuery = graphql`query Routes_Register_Query { viewer { ...Register_viewer } }`
const userProfileQuery = graphql`query Routes_Profile_Query { viewer { ...Profile_viewer } }`
const userPostsQuery = graphql`query Routes_UserPosts_Query ($afterCursor: String, $count: Int!) { viewer { ...UserPosts_viewer } }`
const createPostQuery = graphql`query Routes_CreatePost_Query { viewer { ...CreatePost_viewer } }`

const getPage = props => import(`./${props.page}`)

const UniversalComponent = universal(getPage, {
  loading: <div>Hi! I'm not ready yet</div>,
})

const createRender = page => renderParams => (
  <UniversalComponent page={page} {...renderParams.props} isLoading={false} />
)

export default makeRouteConfig(
  <Route
    path="/"
    query={appQuery}
    // we use the render method instead of Component here to always display Header
    // and Navigation even if the data has not been fetched yet
    render={({ match, ownProps, props }) =>
      <App {...match} {...ownProps} {...props} isLoading={!props} />}
  >
    <Route
      render={createRender('Home')}
      query={homeQuery}
    />

    <Route
      path="posts"
      render={createRender('Posts')}
      query={postsQuery}
      prepareVariables={params => ({
        ...params,
        count: POST_COUNT,
        afterCursor: null,
      })}
    />

    <Route
      path="post/:postId"
      render={createRender('PostDetail')}
      query={postDetailQuery}
    />

    <Route
      path="login"
      render={createRender('UserLogin')}
      query={loginQuery}
    />

    <Route
      path="register"
      render={createRender('UserRegister')}
      query={registerQuery}
    />

    <Route
      path="user"
      render={createRender('UserProfile')}
      query={userProfileQuery}
    />

    <Route
      path="user/posts"
      render={createRender('UserPosts')}
      query={userPostsQuery}
      prepareVariables={params => ({
        ...params,
        count: POST_COUNT,
        afterCursor: null,
      })}
    />

    <Route
      path="user/post/create"
      render={createRender('UserCreatePost')}
      query={createPostQuery}
    />
  </Route>,
)
