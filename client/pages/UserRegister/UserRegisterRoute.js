import { graphql } from 'react-relay'

const query = graphql`
  query UserRegisterRoute_Query {
    permission {
      isAnonymous
    }
  }
`

export default {
  render: 'UserRegisterPage',
  permission: 'isAnonymous',
  query,
}
