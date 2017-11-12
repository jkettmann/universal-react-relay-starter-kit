Go to Elastic Beanstalk in the AWS console menu.

## New Application

Click on `Create New Application` and enter a name. We will create two environments inside this application, one for the app and one for the GraphQL API.

## Environment type

- Click on `Create New Environment` and select `Nodejs` as `Predefined configuration`.
- Click next.

## Application version

- Select `Sample Application` as `Source`. The source will be altered by `CodePipeline` later.
- Click next.

## Environment Info

- Enter a name in for the environment `Environment name` like `universal-react-relay-app`.
- Change the URL for the environment if the prefilled URL is not available in `Environment URL`.
- Click next.

## Additional Resources

- We can leave this as it is. Click next.

## Configuration Details

- The `Instance type` `t2.micro` is sufficient for the start.
- Enter an `Email address` if you want to get updates on your environment. You will receive emails when for example a new version is deployed or health status changes.
- Enter `/health` as `Application health check URL`. The `/health` endpoint returns `200` as soon as the webpack build on the server for server side rendering is through. This way the Elastic Beanstalk can know when to deploy a instance or inform you when the server crashes.
- Leave the rest as is and click on next.

## Permissions

- If not already available the necessary `Instance profile` and `Service role` will be created for you.
- Click next and the environment will be started.

## Remaining setup

- In the environments side menu click on `Configuration`.
- This project uses `Node 8.4.0`. Enter `8.4.0` in the `Node version` field.
- By default `npm start` is run as `Node command`. We want to run the production script. Enter `npm run start:prod:app` for the app or `npm run start:prod:graphql` for the GraphQL server.
- Scroll down and enter the necessary environment variables from your `.env` file.
- Click save.

## Test your page

- Repeat the setup once for the app server environment, once for the GraphQL server environment.
- Now the environment will be updated.
- After some time the health status should transition to `OK`.
- Visit the URL of the app server in browser. The app should be working fine now.