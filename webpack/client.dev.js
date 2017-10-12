const path = require('path')
const webpack = require('webpack')
const WriteFilePlugin = require('write-file-webpack-plugin') // here so you can see what chunks are built
const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  name: 'client',
  target: 'web',
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
    'react-hot-loader/patch',
    path.resolve(__dirname, '../client/index.js'),
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, '../buildClient'),
    publicPath: '/static/',
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
    new WriteFilePlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
      filename: '[name].js',
      minChunks: Infinity,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        AWS_COGNITO_REGION: JSON.stringify(process.env.AWS_COGNITO_REGION),
        AWS_COGNITO_USER_POOL_ID: JSON.stringify(process.env.AWS_COGNITO_USER_POOL_ID),
        AWS_COGNITO_USER_POOL_CLIENT_ID: JSON.stringify(process.env.AWS_COGNITO_USER_POOL_CLIENT_ID),
        AWS_COGNITO_IDENTITY_POOL_ID: JSON.stringify(process.env.AWS_COGNITO_IDENTITY_POOL_ID),
      },
    }),
  ],
}
