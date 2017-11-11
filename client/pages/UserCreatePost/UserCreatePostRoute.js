import { graphql } from 'react-relay'

const query = graphql`
  query UserCreatePostRoute_Query {
    viewer {
      canPublish
    }
  }
`

export default {
  render: 'UserCreatePostPage',
  permission: 'canPublish',
  query,
}
