import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'
import { routerShape } from 'found/lib/PropTypes'
import { createFragmentContainer, graphql } from 'react-relay'
import { Helmet } from 'react-helmet'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import theme from '../theme'
import Navigation from './Navigation'

const messages = defineMessages({
  pageTitle: { id: 'App.pageTitle', defaultMessage: 'Universal Relay Starter Kit' },
  metaDescription: { id: 'App.metaDescription', defaultMessage: 'The description to be displayed in google search results' },
})

class App extends React.Component {
  static childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }

  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    viewer: PropTypes.shape({
      user: PropTypes.object,
    }),
    children: PropTypes.node.isRequired,
    router: routerShape.isRequired,
    intl: intlShape.isRequired,
  }

  static defaultProps = {
    viewer: {},
    isLoading: false,
  }

  constructor() {
    super()
    this.state = {
      navigationOpen: false,
    }
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) }
  }

  render() {
    const { viewer, children, intl } = this.props
    const { navigationOpen } = this.state

    return (
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
  }
}

export default createFragmentContainer(
  injectIntl(App),
  graphql`
    fragment App_viewer on Viewer {
      ...Navigation_viewer
    }
  `,
)
