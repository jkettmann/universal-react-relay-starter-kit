## Create AWS S3 Bucket

First you have to create a S3 Bucket where the GitLab CI will push the build files. Go to to your [AWS console](https://console.aws.amazon.com/console/home) and login.

- Select S3 from the menu.
- Create a new bucket with name `gitlab-ci-build` or any other name you prefer.
- Click through the standard settings until the bucket is created.

## Create AWS Elastic Beanstalk app

See the [Elastic Beanstalk setup instruction](https://github.com/jkettmann/universal-react-relay-starter-kit).

## Add IAM user

Select IAM in the AWS console menu. Add a new user called `Gitlab-CI` with `Access type` `Programmatic access`. Give it the permissions `AmazonS3FullAccess` and `AWSElasticBeanstalkFullAccess`. Save the access keys that were created in a save place. We will use them in the GitLab CI setup.

## GitLab CI setup

Go to the GitLab repository and select `Settings -> CI/CD` in the left sidebar.

### Select a runner

This project uses shared runners with the tag `gitlab-org` on GitLab by default. Compare the tags in every stage inside `gitlab-ci.yml` and the `Runners settings` drawer in your GitLab settings. For using a runner on your local machine refer to the [runner installation](https://docs.gitlab.com/runner/install/) and [registration](https://docs.gitlab.com/runner/register/index.html) docs.

### Deinfe environment variables

Expand the `Secret variables` drawer and add following environment variables.

```
// the name of the bucket created in the first step
S3_BUCKET
// a directory where the build files will be copied to
S3_KEY

// the app and environment names for the Elastic Beanstalk you setup in the second step
ELASTIC_BEANSTALK_APP_NAME
ELASTIC_BEANSTALK_APP_ENV
ELASTIC_BEANSTALK_GRAPHQL_ENV

// your AWS region, for example us-east-1
AWS_DEFAULT_REGION
// the access and secret access key you received in the third step
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
```

Now you are all setup and can push a new commit. You should see a pipeline executing when you click on the CI/CD menu in the left sidebar of your GitLab repository.

## References

- [Blog post by Thomas Lackemann](https://lacke.mn/continuous-integration-using-gitlab-with-elastic-beanstalk/)