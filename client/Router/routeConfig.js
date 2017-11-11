import React from 'react'
import Route from 'found/lib/Route'
import RedirectException from 'found/lib/RedirectException'
import makeRouteConfig from 'found/lib/makeRouteConfig'
import universal from 'react-universal-component'

import Loading from '../components/Loading'

import AppRouteConfig from '../pages/App/AppRoute'
import HomeRouteConfig from '../pages/Home/HomeRoute'
import PostDetailsRouteConfig from '../pages/PostDetails/PostDetailsRoute'
import PostsRouteConfig from '../pages/Posts/PostsRoute'
import UserCreatePostRouteConfig from '../pages/UserCreatePost/UserCreatePostRoute'
import UserLoginRouteConfig from '../pages/UserLogin/UserLoginRoute'
import UserPostsRouteConfig from '../pages/UserPosts/UserPostsRoute'
import UserProfileRouteConfig from '../pages/UserProfile/UserProfileRoute'
import UserRegisterRouteConfig from '../pages/UserRegister/UserRegisterRoute'
import UserVerifyRouteConfig from '../pages/UserVerify/UserVerifyRoute'

import paths from './paths'

const getPage = props => import(`../async/${props.page}`)

const UniversalComponent = universal(getPage, {
  loading: Loading,
  error: (ref) => {
    console.log(ref)
    console.error(ref.error.stack)
    return <div>{ref.error.message}</div>
  },
})

// eslint-disable-next-line react/prop-types
const createRender = (page, permission) => ({ props }) => {
  if (permission && !props) {
    return null
  }
  // eslint-disable-next-line react/prop-types
  if (permission && props && props.viewer && !props.viewer[permission]) {
    throw new RedirectException(paths.unauthorized)
  }

  return <UniversalComponent page={page} {...props} isLoading={!props} />
}

const prepareRouteConfig = ({ render, permissions, ...config }) => ({
  ...config,
  render: render && createRender(render, permissions),
})

export default makeRouteConfig(
  <Route {...prepareRouteConfig(AppRouteConfig)}>
    <Route {...prepareRouteConfig(HomeRouteConfig)} />
    <Route {...prepareRouteConfig(PostsRouteConfig)} />
    <Route {...prepareRouteConfig(PostDetailsRouteConfig)} />
    <Route {...prepareRouteConfig(UserLoginRouteConfig)} />
    <Route {...prepareRouteConfig({ ...UserLoginRouteConfig, path: paths.unauthorized })} />
    <Route {...prepareRouteConfig(UserRegisterRouteConfig)} />
    <Route {...prepareRouteConfig(UserVerifyRouteConfig)} />
    <Route {...prepareRouteConfig(UserProfileRouteConfig)} />
    <Route {...prepareRouteConfig(UserPostsRouteConfig)} />
    <Route {...prepareRouteConfig(UserCreatePostRouteConfig)} />
  </Route>,
)
