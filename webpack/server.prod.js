const path = require('path')
const webpack = require('webpack')
const dotenv = require('dotenv')

dotenv.config()

const res = p => path.resolve(__dirname, p)

const entry = res('../server/render/render.js')
const output = res('../buildClientSSR')

module.exports = {
  name: 'server',
  target: 'node',
  devtool: 'source-map',
  entry: [entry],
  output: {
    path: output,
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        GRAPHQL_ENDPOINT: JSON.stringify(process.env.GRAPHQL_ENDPOINT),
        AWS_COGNITO_USER_POOL_ID: JSON.stringify(process.env.AWS_COGNITO_USER_POOL_ID),
        AWS_COGNITO_USER_POOL_CLIENT_ID: JSON.stringify(process.env.AWS_COGNITO_USER_POOL_CLIENT_ID),
        AWS_COGNITO_IDENTITY_POOL_ID: JSON.stringify(process.env.AWS_COGNITO_IDENTITY_POOL_ID),
        FACEBOOK_APP_ID: JSON.stringify(process.env.FACEBOOK_APP_ID),
      },
    }),
  ],
}
