import { graphql } from 'react-relay'

const query = graphql`
  query UserCreatePostRoute_Query {
    viewer {
      canPublish
    }
  }
`

export default {
  path: '/user/post/create',
  render: 'UserCreatePostPage',
  permission: 'canPublish',
  query,
}
