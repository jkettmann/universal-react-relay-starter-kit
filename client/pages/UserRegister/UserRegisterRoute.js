import { graphql } from 'react-relay'

const query = graphql`
  query UserRegisterRoute_Query {
    viewer {
      ...UserRegister_viewer
    }
  }
`

export default {
  path: '/register',
  render: 'UserRegisterPage',
  query,
}
