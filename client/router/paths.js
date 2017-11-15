export const buildPathWithVariable = (path, variables) => {
  const variableNames = Object.keys(variables)
  const pathWithVariables = variableNames.reduce(
    (tmpPath, name) => tmpPath.replace(`:${name}`, variables[name]),
    path,
  )

  if (pathWithVariables.indexOf(':') > -1) {
    console.warn(`A variable might not have been set in path ${pathWithVariables}`)
  }

  return pathWithVariables
}

export default {
  app: '/',
  home: '/',
  postDetails: '/post/:postId',
  posts: '/posts',
  userCreatePost: '/user/post/create',
  userLogin: '/login',
  userPosts: '/user/posts',
  userProfile: '/user',
  userRegister: '/register',
  userVerifyWithEmail: '/verify/:email',
  userVerifyWithoutEmail: '/verify',
  resetPassword: '/resetPassword',
  unauthorized: '/unauthorized',
}
