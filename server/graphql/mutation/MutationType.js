import { GraphQLObjectType } from 'graphql'

import RegisterMutation from './RegisterMutation'
import LoginMutation from './LoginMutation'
import LogoutMutation from './LogoutMutation'
import ResendVerificationMutation from './ResendVerificationMutation'
import VerifyAccountMutation from './VerifyAccountMutation'
import CreatePostMutation from './CreatePostMutation'

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    register: RegisterMutation,
    login: LoginMutation,
    logout: LogoutMutation,
    resendVerification: ResendVerificationMutation,
    verifyAccount: VerifyAccountMutation,
    createPost: CreatePostMutation,
  }),
})
