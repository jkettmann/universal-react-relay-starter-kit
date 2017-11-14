import { graphql } from 'react-relay'

const query = graphql`
  query UserVerifyRoute_Query {
    permission {
      isAnonymous
    }
  }
`

export default {
  render: 'UserVerifyPage',
  query,
}
