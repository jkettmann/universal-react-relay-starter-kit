import { graphql } from 'react-relay'

const query = graphql`
  query HomeRoute_Query {
    viewer {
      ...Home_viewer
    }
  }
`

export default {
  path: '/',
  render: 'HomePage',
  query,
}
