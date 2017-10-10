This starter kit aims at helping developers starting a professional app to create a basic setup quickly. It will use AWS infrastructure, but it should be simple to switch to other providers.

## Content

- [Installation](#installation)
- [Technologies](#technologies)
- [Design decisions](#design-decisions)
- [How to create a new route](#how-to-create-a-new-route)
- [Roadmap](#roadmap)
- [Credits](#credits)

## Installation
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

## Roadmap

- Use real database
- Login and registration (probably using [Passport](http://passportjs.org/) and [AWS Cognito](https://aws.amazon.com/de/cognito/))
- Server side security using [helmet](https://github.com/helmetjs/helmet)
- Unit and snapshot tests using [Jest](https://github.com/facebook/jest) and end-to-end tests using [cypress](https://www.cypress.io/)

## Credits

### Icons

User icon made by [Smashicons](https://www.flaticon.com/authors/smashicons) from [www.flaticon.com](https://www.flaticon.com/) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/)