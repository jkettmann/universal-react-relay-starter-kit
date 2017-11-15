import React from 'react'
import Route from 'found/lib/Route'
import RedirectException from 'found/lib/RedirectException'
import makeRouteConfig from 'found/lib/makeRouteConfig'

import UniversalComponent from '../components/UniversalComponent'

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
import UserResetPasswordRouteConfig from '../pages/UserResetPassword/UserResetPasswordRoute'

import paths from './paths'

// eslint-disable-next-line react/prop-types
const createRender = (page, permission) => ({ props }) => {
  if (permission && !props) {
    return null
  }
  // eslint-disable-next-line react/prop-types
  if (permission && props && props.permission && !props.permission[permission]) {
    throw new RedirectException(paths.unauthorized)
  }

  const { __fragments, __id } = props || {}
  const data = { __fragments, __id }

  return <UniversalComponent name={page} {...props} data={data} isLoading={!props} />
}

const prepareRouteConfig = ({ render, permission, ...config }) => ({
  ...config,
  render: render && typeof render === 'string' ? createRender(render, permission) : render,
})

export default makeRouteConfig(
  <Route path={paths.app} {...prepareRouteConfig(AppRouteConfig)}>
    <Route path={paths.home} {...prepareRouteConfig(HomeRouteConfig)} />
    <Route path={paths.posts} {...prepareRouteConfig(PostsRouteConfig)} />
    <Route path={paths.postDetails} {...prepareRouteConfig(PostDetailsRouteConfig)} />
    <Route path={paths.userLogin} {...prepareRouteConfig(UserLoginRouteConfig)} />
    <Route path={paths.unauthorized} {...prepareRouteConfig(UserLoginRouteConfig)} />
    <Route path={paths.userRegister} {...prepareRouteConfig(UserRegisterRouteConfig)} />
    <Route path={paths.userVerifyWithEmail} {...prepareRouteConfig(UserVerifyRouteConfig)} />
    <Route path={paths.userVerifyWithoutEmail} {...prepareRouteConfig(UserVerifyRouteConfig)} />
    <Route path={paths.resetPassword} {...prepareRouteConfig(UserResetPasswordRouteConfig)} />
    <Route path={paths.userProfile} {...prepareRouteConfig(UserProfileRouteConfig)} />
    <Route path={paths.userPosts} {...prepareRouteConfig(UserPostsRouteConfig)} />
    <Route path={paths.userCreatePost} {...prepareRouteConfig(UserCreatePostRouteConfig)} />
  </Route>,
)
