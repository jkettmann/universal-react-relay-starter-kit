## AWS S3 Bucket for images

We need to create a S3 bucket to store uploaded images.

- Go to `S3` in the AWS console menu.
- Click on `Create bucket`.
- Enter a name like `upload-images`.
- Select a region and click on `Next`.
- We don't need any of the properties here so just click `Next`.
- The bucket should not be public. So just click `Next`. The access will be handled by `S3Router` from the [react-s3-uploader](https://github.com/odysseyscience/react-s3-uploader) package. The images will appear to be on our apps domain and prefixed with `/image/`. If our app has the domain `example.com` an image with the name `photo.jpg` will have the URL `example.com/image/photo.jpg`. `S3Router` will create a signed URL with the credentials of the IAM user we configure the AWS SDK with and redirect the image request to the S3 bucket.
- Click `Create bucket`.
- Set the name of the bucket as `S3_IMAGE_BUCKET` in your `.env` file.
