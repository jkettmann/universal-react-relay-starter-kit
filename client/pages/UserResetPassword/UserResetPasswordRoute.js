import { graphql } from 'react-relay'

const query = graphql`
  query UserResetPasswordRoute_Query {
    permission {
      isAnonymous
    }
  }
`

export default {
  render: 'UserResetPasswordPage',
  permission: 'isAnonymous',
  query,
}
