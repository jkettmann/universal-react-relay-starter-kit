import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers } from 'recompose'
import S3Uploader from 'react-s3-uploader'

const ImageInput = ({
  style,
  label,
  fullWidth,
  file,
  imageSrc,
  onUploadStart,
  onUploadProgress,
  onUploadError,
  onUploadFinish,
}) => (
  <div style={style}>
    <S3Uploader
      signingUrl="/image/sign"
      signingUrlMethod="GET"
      accept="image/*"
      preprocess={onUploadStart}
      onProgress={onUploadProgress}
      onError={onUploadError}
      onFinish={onUploadFinish}
      uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}  // this is the default
      contentDisposition="auto"
      scrubFilename={filename => filename.replace(/[^\w\d_\-.]+/ig, '')}
      signingUrlWithCredentials
    />

    <div
      style={{
        width: '100%',
        height: 'auto',
        marginTop: 20,
        display: imageSrc ? 'block' : 'none',
      }}
    >
      <img
        style={{ width: '100%' }}
        src={imageSrc}
        alt={file ? file.name : 'new image'}
      />
    </div>
  </div>
)

ImageInput.propTypes = {
  file: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  imageSrc: PropTypes.string,
  label: PropTypes.node,
  fullWidth: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  onUploadStart: PropTypes.func.isRequired,
  onUploadProgress: PropTypes.func.isRequired,
  onUploadError: PropTypes.func.isRequired,
  onUploadFinish: PropTypes.func.isRequired,
}

ImageInput.defaultProps = {
  file: null,
  imageSrc: null,
  label: null,
  fullWidth: false,
  style: null,
}

const handlers = {
  onUploadStart: () => (file, next) => {
    console.log('upload start')
    next(file)
  },
  onUploadProgress: () => (percent, message) => {
    console.log('upload progress', percent, message)
  },
  onUploadError: () => (message) => {
    console.log('upload error', message)
  },
  onUploadFinish: ({ onChange }) => ({ fileKey, publicUrl }) => {
    console.log('upload finish', ...arguments)
    const imageSrc = publicUrl.replace('/s3/', '/image/')
    onChange({ fileKey, imageSrc })
  },
}

const enhance = compose(
  withHandlers(handlers),
)

export default enhance(ImageInput)
