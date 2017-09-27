This starter kit aims at helping developers starting a professional app to create a basic setup quickly. It will use AWS infrastructure, but it should be simple to switch to other providers.

## Content

- [Technologies](#technologies)
- [Design decisions](#design-decisions)
- [Roadmap](#roadmap)
- [Credits](#credits)

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

## Roadmap

- Use real database
- Login and registration (probably using [Passport](http://passportjs.org/) and [AWS Cognito](https://aws.amazon.com/de/cognito/))
- Server side security using [helmet](https://github.com/helmetjs/helmet)
- Unit and snapshot tests using [Jest](https://github.com/facebook/jest) and end-to-end tests using [cypress](https://www.cypress.io/)

## Credits

### Icons

User icon made by [Smashicons](https://www.flaticon.com/authors/smashicons) from [www.flaticon.com](https://www.flaticon.com/) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/)