import { graphql } from 'react-relay'

const query = graphql`
  query HomeRoute_Query {
    ...Home
  }
`

export default {
  render: 'HomePage',
  query,
}
