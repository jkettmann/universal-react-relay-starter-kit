const path = require('path')
const webpack = require('webpack')
const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  name: 'client',
  target: 'web',
  devtool: 'source-map',
  entry: [path.resolve(__dirname, '../client/index.js')],
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, '../buildClient'),
    publicPath: '/static/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'env',
              'react',
              'stage-0',
            ],
            plugins: [
              'transform-runtime',
              ['relay', {
                schema: 'graphql/schema.graphql',
              }],
              ['babel-plugin-styled-components', {
                ssr: true,
              }],
              ['react-intl', {
                messagesDir: './build/intl/messages/',
              }],
              'universal-import',
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
      filename: '[name].[chunkhash].js',
      minChunks: Infinity,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        GRAPHQL_ENDPOINT: JSON.stringify(process.env.GRAPHQL_ENDPOINT),
        AWS_COGNITO_REGION: JSON.stringify(process.env.AWS_COGNITO_REGION),
        AWS_COGNITO_USER_POOL_ID: JSON.stringify(process.env.AWS_COGNITO_USER_POOL_ID),
        AWS_COGNITO_USER_POOL_CLIENT_ID: JSON.stringify(process.env.AWS_COGNITO_USER_POOL_CLIENT_ID),
        AWS_COGNITO_IDENTITY_POOL_ID: JSON.stringify(process.env.AWS_COGNITO_IDENTITY_POOL_ID),
        FACEBOOK_APP_ID: JSON.stringify(process.env.FACEBOOK_APP_ID),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        screw_ie8: true,
        comments: false
      },
      sourceMap: true
    }),
    new webpack.HashedModuleIdsPlugin(), // not needed for strategy to work (just good practice)
  ],
}
