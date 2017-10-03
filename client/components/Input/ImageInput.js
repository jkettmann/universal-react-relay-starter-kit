import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers, withProps } from 'recompose'
import { HOC } from 'formsy-react'
import S3Uploader from 'react-s3-uploader'

import Button from '../Button'

class FileInput extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    label: PropTypes.node,
    value: PropTypes.shape({
      imageSrc: PropTypes.string,
      fileKey: PropTypes.string,
    }),
    fullWidth: PropTypes.bool,
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
  }

  static defaultProps = {
    label: null,
    value: null,
    fullWidth: false,
    style: null,
  }

  constructor() {
    super()
    this.state = {
      fileKey: null,
      imageSrc: null,
    }
  }

  onUploadStart = (file, next) => {
    console.log('upload start')
    next(file)
  }

  onUploadProgress = (percent, message) => {
    console.log('upload progress', percent, message)
  }

  onUploadError = (message) => {
    console.log('upload error', message)
  }

  onUploadFinish = ({ fileKey, publicUrl }) => {
    console.log('upload finish', ...arguments)
    const imageSrc = publicUrl.replace('/s3/', '/image/')
    this.props.onChange({ fileKey, imageSrc })
  }

  render() {
    const { style, label, value, fullWidth } = this.props

    return (
      <div style={style}>
        <Button
          label={label}
          fullWidth={fullWidth}
          onClick={this.openDialog}
        />

        <div
          style={{
            width: '100%',
            height: 'auto',
            marginTop: 20,
            display: value && value.imageSrc ? 'block' : 'none',
          }}
        >
          <img
            style={{ width: '100%' }}
            src={value && value.imageSrc}
            alt="post"
          />
        </div>

        <S3Uploader
          signingUrl="/image/sign"
          signingUrlMethod="GET"
          accept="image/*"
          preprocess={this.onUploadStart}
          onProgress={this.onUploadProgress}
          onError={this.onUploadError}
          onFinish={this.onUploadFinish}
          uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}  // this is the default
          contentDisposition="auto"
          scrubFilename={filename => filename.replace(/[^\w\d_\-.]+/ig, '')}
          signingUrlWithCredentials
        />
      </div>
    )
  }
}

const props = withProps(({ getValue }) => ({
  value: getValue(),
}))

const handlers = withHandlers({
  onChange: ({ setValue }) => input => setValue(input),
})

const enhance = compose(handlers, props)

export default HOC(enhance(FileInput))
