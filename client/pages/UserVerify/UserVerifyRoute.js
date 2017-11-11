import { graphql } from 'react-relay'

const query = graphql`
  query UserVerifyRoute_Query {
    viewer {
      ...UserVerify_viewer
    }
  }
`

export default {
  render: 'UserVerifyPage',
  query,
}
