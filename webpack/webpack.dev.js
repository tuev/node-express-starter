/* -------------------------------------------------------------------------- */
/*                        DEVELOPMENT WEBPACK CONFIGURATION                        */
/* -------------------------------------------------------------------------- */

const { mergeWith, isArray } = require('lodash')
const basicConfig = require('./webpack.config')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const nodeExternals = require('webpack-node-externals')
const StartServerPlugin = require('start-server-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const webpack = require('webpack')

const optimizer = (objValue, srcValue) => {
  if (isArray(objValue)) {
    return objValue.concat(srcValue)
  }
}

const config = mergeWith(
  basicConfig,
  {
    mode: 'development',
    watch: true,
    devtool: 'sourcemap',
    target: 'node',
    // Add hot reloading in development
    entry: ['webpack/hot/poll?1000', './src/index.js'],
    externals: [
      nodeExternals({
        whitelist: ['webpack/hot/poll?1000']
      })
    ],
    plugins: [
      new StartServerPlugin('main.js'),
      new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new CleanWebpackPlugin(),
      new Dotenv({
        path: './.env.development'
      }),
      new CircularDependencyPlugin({
        exclude: /a\.js|node_modules/, // exclude node_modules
        failOnError: false // show a warning when there is a circular dependency
      })
    ],
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    performance: {
      hints: false
    }
  },
  optimizer
)

module.exports = config
