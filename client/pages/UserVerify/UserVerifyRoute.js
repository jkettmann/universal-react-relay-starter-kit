import { graphql } from 'react-relay'

const query = graphql`
  query UserVerifyRoute_Query {
    viewer {
      ...UserVerify_viewer
    }
  }
`

export default {
  path: '/verify/:email',
  render: 'UserVerifyPage',
  query,
}
