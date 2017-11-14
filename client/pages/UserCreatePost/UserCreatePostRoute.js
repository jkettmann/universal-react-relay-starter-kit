import { graphql } from 'react-relay'

const query = graphql`
  query UserCreatePostRoute_Query {
    permission {
      canPublish
    }
  }
`

export default {
  render: 'UserCreatePostPage',
  permission: 'canPublish',
  query,
}
