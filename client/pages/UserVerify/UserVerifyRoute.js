import { graphql } from 'react-relay'

const query = graphql`
  query UserVerifyRoute_Query {
    ...UserVerify
  }
`

export default {
  render: 'UserVerifyPage',
  query,
}
