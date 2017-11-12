## Setup AWS CodePipeline
pipeline name Universal-React-Relay-Starter-Kit
source provider github
connect to github
select repository
select branch

build provider AWS CodeBuild
Select an existing build project

deployement provider: AWS Elsatic Beanstalk
Select application
Select environment

Service Role: Create Role
Click Allow on next page

Review: Create Pipeline


## Setup AWS CodeBuild

Go to to your [AWS console](https://console.aws.amazon.com/console/home) and login. First you need to create a S3 Bucket to store the build atrifacts.

- Select S3 from the menu.
- Create a new bucket with name `universal-react-relay-starter-kit-codebuild-artifacts` or any other name you prefer.
- Click through the standard settings until the bucket is created.

Now you can start setting up CodeBuild.

- Select CodeBuild from the menu.
- Create a new project.
- Enter `Universal-React-Relay-Starter-Kit` as name (or any other name you prefer).
- Under `Source provider` select `GitHub` ff your repository is hosted there.
- Connect CodeBuild with your GitHub account.
- Select `Use a repository in my account` and choose the repository.
- This project uses `Node 8`, which is currently not directly available on AWS.
  - Under `Environment` select `Specify a docker image`.
  - Select `Linux` as `Environment type`
  - Select `Other` as `Custom image type`
  - Enter `library/node:8.4` at `Custom image ID`
- `Use the buildspec.yml in the source code root directory` should be enabled as `Build specification`. This will execute the steps you can find inside `buildspec.yml` in this repository.
- To save artifacts choose `Amazon S3` as type and select the bucket your created previously.
- Leave the selection for `Service role` at `Create a service role in your account`. If you decide to go back after clicking `Continue` you might have to select `Choose an existing service role from my account` since this role will be created on clicking on `Continue`.
- This project doesn't use environment variables in the build step. If you have to define some anyway click on `Show advanced settings` and enter the key-value-pairs there.
- Click on `Continue`. Review and confirm the settings.
- After creating the project you can start a test build and check the S3 Bucket if everything went fine.
