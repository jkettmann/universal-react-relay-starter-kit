import { graphql } from 'react-relay'

const query = graphql`
  query UserRegisterRoute_Query {
    viewer {
      ...UserRegister_viewer
    }
  }
`

export default {
  render: 'UserRegisterPage',
  query,
}
