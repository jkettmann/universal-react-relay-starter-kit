import React from 'react'
import PropTypes from 'prop-types'
import { injectGlobal, ThemeProvider } from 'styled-components'
import { routerShape } from 'found/lib/PropTypes'
import { createFragmentContainer, graphql } from 'react-relay'
import { Helmet } from 'react-helmet'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import Navigation from './Navigation'

// eslint-disable-next-line no-unused-expressions
injectGlobal`
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Roboto, sans-serif;;
  font-weight: 300;
  color: #555;
}
`

const theme = {
  color: {
    primary: 'rgb(0, 188, 212)',
    secondary: '#ff4081',
    text: '#555555',
    textAlternate: '#ffffff',
    grey0: '#000000',
    grey1: '#555555',
    grey4: '#a7a7a7',
    grey5: '#ffffff',
  },
  sizes: {
    navigationHeight: {
      value: 60,
      unit: 'px',
    },
    icon: {
      value: 24,
      unit: 'px',
    },
  },
  zIndex: {
    navigationBar: 1100,
    navigation: 1101,
    navigationIcon: 1102,
  },
  animation: '450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
}

theme.size = (name) => {
  if (!theme.sizes[name]) {
    console.error(`no size ${name} defined`)
  }
  return `${theme.sizes[name].value}${theme.sizes[name].unit}`
}

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
