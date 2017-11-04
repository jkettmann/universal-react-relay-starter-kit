This starter kit aims at helping developers starting a professional app to create a basic setup quickly. It will use AWS infrastructure, but it should be simple to switch to other providers.

## Content

- [Installation](#installation)
- [Technologies](#technologies)
- [Design decisions](#design-decisions)
- [How to create a new route](#how-to-create-a-new-route)
- [Functional components](#functional-components)
- [Roadmap](#roadmap)
- [Credits](#credits)

## Installation
This project uses [dotenv](https://github.com/motdotla/dotenv) to set environment variables from a `.env` file. Therefore you need to add a file named `.env` to the root of the project. The content should be as follows. Please fill out `...` with your AWS or Facebook keys etc.

```
### Common environment variables ###
NODE_ENV=development

### Environment variables for the app server ###
PORT_APP=3000
GRAPHQL_ENDPOINT=http://localhost:8080
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
# name of the AWS S3 Bucket used to store uploaded images
S3_IMAGE_BUCKET=petsnbeds-images
# used for react-s3-uploader
IMAGE_BASE_URL=/image/uploads
FACEBOOK_APP_ID=...

### Environment variables for the GraphQL server ###
PORT_GRAPHQL=8080
# Important for allowing CORS access.
# Should be a domain including protocol, like https://example.com
APP_ENDPOINT=http://localhost:3000
# Important for setting cookie from GraphQL server for the app.
# Should be a domain, like example.com
COOKIE_DOMAIN=localhost
AWS_COGNITO_USER_POOL_ID=...
AWS_COGNITO_USER_POOL_CLIENT_ID=...
AWS_COGNITO_IDENTITY_POOL_ID=...
AWS_COGNITO_REGION=...
```

- Install [watchman](https://facebook.github.io/watchman/)
- (optional) When you installed `watchman` you can also easily switch to [yarn](https://yarnpkg.com/en/)

- run following commands:
  - `yarn install` or `npm install`
  - `yarn run relay-compiler` or `npm run relay-compiler`
  - `yarn start` or `npm start`

- open [localhost:3000](http://localhost:3000) in your browser

## Technologies

- [React](https://github.com/facebook/react)
- [Relay modern](https://github.com/facebook/relay) as GraphQL client
- [React Universal Component](https://github.com/faceyspacey/react-universal-component) for server-side-rendering and code-splitting
- [styled-components](https://github.com/styled-components/styled-components)
- [recompose](https://github.com/acdlite/recompose)
- [GraphQL](https://github.com/graphql/graphql-js)
- [Express](https://github.com/expressjs/express)
- Hot reloading on client ([react-hot-loader](https://github.com/gaearon/react-hot-loader)) and server ([webpack-hot-server-middleware](https://github.com/glenjamin/webpack-hot-middleware))

## Design decisions

- Kind of flat component structure: The [relay-compiler](https://facebook.github.io/relay/docs/relay-compiler.html) enforces unique fragment names. This is easily achieved using a flat component structure.

  At the same time [styled-components](https://github.com/styled-components/styled-components) requires defining simple styled wrapper components. Component files stay very clean when defining these wrapper components in own files.

  This is why components are defined in `index.js` inside their own folder with smaller wrapper components next to them. Currently Relay container components have to have the same name as their fragment due to [relay-compiler](https://facebook.github.io/relay/docs/relay-compiler.html). See [this issue](https://github.com/facebook/relay/issues/2093).

## How to create a new route

Add your new page component to `client/pages/MyNewPage/MyNewPage.js`. If the component does not need any data from the server, just add your component like following

```
const MyNewPage = () => (
  <div>
    Some content
  </div>
)

export default MyNewPage
```

In order to enable code splitting via `react-universal-component` for this page, add the file `client/async/MyNewPage.js` and export your page component like following:

```
export { default } from '../pages/MyNewPage/MyNewPage'
```

Now we need to add a new route to the Router. Open `client/Routes.js` and add following route:

```
<Route
  path="/myNewPage"
  render={createRender('MyNewPage')}
/>
```

Now you should have a new page at `/myNewPage`.

If the page component needs fetched data, use `Relay.createFragmentContainer` or another appropriate container function

```
const MyNewPage = ({ viewer }) => (
  <div>
    You are currently {!viewer.isLoggedIn && 'not'} logged in.
  </div>
)

MyNewPage.propTypes = {
  viewer: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
  }).isRequired,
}

export default createFragmentContainer(
  MyNewPage,
  graphql`
    fragment MyNewPage_viewer on Viewer {
      isLoggedIn
    }
  `,
)
```

Additionally you have to define a query for the route. Open the `Routes.js` and add the query.

```
const myNewPageQuery = graphql`query Routes_MyNewPage_Query { viewer { ...MyNewPage_viewer } }`

<Route
  path="/myNewPage"
  render={createRender('MyNewPage')}
  query={myNewPageQuery}
/>
```

In this case the necessary viewer attributes will be fetched by `found-relay` and passed to your component as `viewer` prop.

## Functional components

Functional components are easier to test and understand, see following comparison.

```
class Button extends React.Component {
  render() {
    return (
      <button>
        {this.props.label}
      </button>
    )
  }
}
```

```
const Button = ({ label }) => (
  <button>
    {label}
  </button>
)
```

It becomes a bit trickier when the component needs to have some logic, for example a click handler which passes the components id to its parent or setting the label to upper case. This is what [recompose](https://github.com/acdlite/recompose) is used for.

```
class Button extends React.Component {
  onClick = () => {
    const { id, onClick } = this.props
    onClick(id)
  }

  render() {
    const label = label.toUpperCase()
    return (
      <button onClick={this.onClick}>
        {label}
      </button>
    )
  }
}

export default Button
```

```
import { compose, withHandlers, withProps } from 'recompose'

const Button = ({ label, onClick }) => (
  <button onClick={onClick}>
    {label}
  </button>
)

const enhance = compose(
  withHandlers({
    onClick: ({ id, onClick }) => () => onClick(id)
  }),
  withProps(({ label }) => ({ label: label.toUpperCase() })),
})

export default enhance(Button)
```

See [recompose](https://github.com/acdlite/recompose) for more information.

## Roadmap

- Use real database
- Login and registration (probably using [Passport](http://passportjs.org/) and [AWS Cognito](https://aws.amazon.com/de/cognito/))
- Server side security using [helmet](https://github.com/helmetjs/helmet)
- Unit and snapshot tests using [Jest](https://github.com/facebook/jest) and end-to-end tests using [cypress](https://www.cypress.io/)

## Credits

### Icons

User icon made by [Smashicons](https://www.flaticon.com/authors/smashicons) from [www.flaticon.com](https://www.flaticon.com/) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/)