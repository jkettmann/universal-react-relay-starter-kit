import { graphql } from 'react-relay'

const query = graphql`
  query UserRegisterRoute_Query {
    ...UserRegister
  }
`

export default {
  render: 'UserRegisterPage',
  query,
}
