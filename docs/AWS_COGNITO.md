## Setting up a user pool

User pools on AWS Cognito can store user login credentials. They are also used to implement the whole registration workflow with email verification, password reset and so on. Two factor authentication and other advanced features may also be enabled easily.

Recently federate identities like Facebook or Google login were also added to user pools, though the [AWS SDK doesn't support them yet](https://github.com/aws/amazon-cognito-identity-js/issues/508). This project started using AWS Federate Identiy pools instead, which is currently the common approach to handle logins with credentials and federate identities. You have to jump to some hoops though to make them work together. For now registering with credentials and logging in with Facebook for example will create two separate users although they may share the same Email address. I will wait on above issue to be resolved before making another attempt on implementing social logins with Cognito.

Follow these steps to create a user pool and use it with this project to store user credentials.

- Select `Cognito` from the AWS console menu
- Click on `Manage your User Pools`
- `Name`: Click on `Create a user pool` and enter a name. Click on `Step through settings`.
- `Attributes`: Select how your users are allowed to sign in. I will use the option `Email address or phone number` and select `Allow email addresses`.
- Select the attributes the user needs to set. Without them a signup will not be possible. I only choose email here.
- You can add more custom attributes below if the ones given are not sufficient. I used an attribute `custom:role` at first to define the users role. This is not very handy though, because its information is not contained in all tokens, which will be returned on login. Also you cannot just change user attributes in the user pool web interface. Now this project uses user groups, which also can have IAM policies attached. Click on `Next step`.
- The settings should be self explanatory. I use a weaker password strategy with 6 letters and no other requirements here, but the default settings seem good for a production app. Users should in our case be allowed to sign themselves up. 7 days for admin created accounts to expire is fine. Click on `Next step`.
- `Verifications`: The standard settings are fine here. Multifactor authentication is disabled and email verification is required.
- `Message customizations`: Here you can customize the content of the verification email/SMS being send out on user registration. To use custom email templates you need to use the `Simple Email Service` of AWS together with `AWS Lambda`. The customization of the `FROM address` is rather easy. In another tab open the `Simple Email Service` in the AWS console menu. Click on `Email addresses` in the left sidebar menu and click on `Verify a New Email Address`. Enter a address you own and click on `Simple Email Service`. You will receive an email to confirm this address. After confirmation you are ready to go. Go back to your `Cognito` setup tab and click on `Add custom FROM address`. Select the newly confirmed address and click on `Next step`.
- `Tags`: Add optional tags here to make identifiying the user pool later on easier.
- `Devices`: [See this blog post](https://aws.amazon.com/blogs/mobile/tracking-and-remembering-devices-using-amazon-cognito-your-user-pools/) for more information. I will use `Always` here. Click `Next step`.
- `App clients`: The GraphQL server will be our client. Click `Add an app client`. Enter a name like `GraphQL-Server`. The default `30` days of `Refresh token expiration` means, that we can use a refresh token instead of logging a user in with credentials in this time period. Uncheck `Generate client secret`, because the [Javascript SDK does not support client secrets](https://github.com/aws/amazon-cognito-identity-js#configuration). Click on `Create app client` and then on `Next step`.
- `Triggers`: We won't use any triggers here, but they can be helpful to execute a lambda function during the authentication workflow.
- Click next and create the pool.
- Copy the pool id and paste it as `AWS_COGNITO_USER_POOL_ID` into your `.env` file.
- Go to `App client settings` in the left sidebar menu and copy the id as `AWS_COGNITO_USER_POOL_CLIENT_ID` into your `.env` file.

### References

- [Medium post by kangzeroo]()https://medium.com/@kangzeroo/user-management-with-aws-cognito-1-3-initial-setup-a1a692a657b3




