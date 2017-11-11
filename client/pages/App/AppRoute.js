import React from 'react'
import { graphql } from 'react-relay'
import App from './App'

const query = graphql`
  query AppRoute_Query {
    ...App
  }
`

export default {
  Component: App,
  // eslint-disable-next-line react/prop-types
  render: ({ props }) => <App {...props} data={props} />,
  query,
}
