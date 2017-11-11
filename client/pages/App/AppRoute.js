import { graphql } from 'react-relay'
import App from './App'

const query = graphql`
  query AppRoute_Query {
    viewer {
      ...App_viewer
    }
  }
`

export default {
  path: '/',
  Component: App,
  query,
}
