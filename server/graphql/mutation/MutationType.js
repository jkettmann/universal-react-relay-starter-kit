import { GraphQLObjectType } from 'graphql'

import RegisterMutation from './RegisterMutation'
import LoginMutation from './LoginMutation'
import LogoutMutation from './LogoutMutation'
import ResendVerificationMutation from './ResendVerificationMutation'
import VerifyAccountMutation from './VerifyAccountMutation'
import ResetPasswordMutation from './ResetPasswordMutation'
import ConfirmPasswordMutation from './ConfirmPasswordMutation'
import CreatePostMutation from './CreatePostMutation'

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    register: RegisterMutation,
    login: LoginMutation,
    logout: LogoutMutation,
    resendVerification: ResendVerificationMutation,
    verifyAccount: VerifyAccountMutation,
    resetPassword: ResetPasswordMutation,
    confirmPassword: ConfirmPasswordMutation,
    createPost: CreatePostMutation,
  }),
})
