import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'
import { createFragmentContainer, graphql } from 'react-relay'
import { Helmet } from 'react-helmet'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import theme from '../../theme'
import Navigation from '../../components/Navigation'

const messages = defineMessages({
  pageTitle: { id: 'App.pageTitle', defaultMessage: 'Universal Relay Starter Kit' },
  metaDescription: { id: 'App.metaDescription', defaultMessage: 'The description to be displayed in google search results' },
})

const App = ({ viewer, children, intl }) => (
  <ThemeProvider theme={theme}>
    <div id="container">
      <Helmet>
        <title>
          {intl.formatMessage(messages.pageTitle)}
        </title>
        <meta
          name="description"
          content={intl.formatMessage(messages.metaDescription)}
        />
      </Helmet>

      <Navigation viewer={viewer} />

      {children}
    </div>
  </ThemeProvider>
)

App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  viewer: PropTypes.shape({
    user: PropTypes.object,
  }),
  children: PropTypes.node.isRequired,
  intl: intlShape.isRequired,
}

App.defaultProps = {
  viewer: {},
  isLoading: false,
}

export default createFragmentContainer(
  injectIntl(App),
  graphql`
    fragment App_viewer on Viewer {
      ...Navigation_viewer
    }
  `,
)
