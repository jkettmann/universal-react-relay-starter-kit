import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'
import { graphql } from 'react-relay'
import { fragment } from 'relay-compose'
import { compose, flattenProp } from 'recompose'
import { Helmet } from 'react-helmet'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import theme from '../../theme'
import Navigation from '../../components/Navigation'
import Dialog from '../../components/Dialog'

const messages = defineMessages({
  pageTitle: { id: 'App.pageTitle', defaultMessage: 'Universal Relay Starter Kit' },
  metaDescription: { id: 'App.metaDescription', defaultMessage: 'The description to be displayed in google search results' },
})

const App = ({ permission, children, intl }) => (
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

      <Navigation permission={permission} />

      {children}

      <Dialog />
    </div>
  </ThemeProvider>
)

App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  permission: PropTypes.object,
  children: PropTypes.node.isRequired,
  intl: intlShape.isRequired,
}

App.defaultProps = {
  permission: {},
  isLoading: false,
}

const enhance = compose(
  fragment(graphql`
    fragment App on Query {
      permission {
        ...Navigation_permission
      }
    }
  `),
  injectIntl,
  flattenProp('data'),
)

export default enhance(App)
