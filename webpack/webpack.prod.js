/* -------------------------------------------------------------------------- */
/*                        PRODUCTION WEBPACK CONFIGURATION                        */
/* -------------------------------------------------------------------------- */

const { mergeWith, isArray } = require('lodash')
const basicConfig = require('./webpack.config')
const TerserPlugin = require('terser-webpack-plugin')
const { HashedModuleIdsPlugin } = require('webpack')
const nodeExternals = require('webpack-node-externals')
const CompressionPlugin = require('compression-webpack-plugin')

const optimizer = (objValue, srcValue) => {
  if (isArray(objValue)) {
    return objValue.concat(srcValue)
  }
}

module.exports = mergeWith(
  basicConfig,
  {
    externals: [nodeExternals({})], // Need this to avoid error when working with Express
    plugins: [
      new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.js$/,
        threshold: 10240,
        minRatio: 0.8
        // deleteOriginalAssets: trues
      }),
      new HashedModuleIdsPlugin({
        hashFunction: 'sha256',
        hashDigest: 'hex',
        hashDigestLength: 20
      })
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            boolean: true,
            drop_console: true,
            compress: {
              comparisons: false
            },
            parse: {},
            mangle: true,
            output: {
              comments: false,
              ascii_only: true
            }
          },
          parallel: 4,
          cache: true,
          sourceMap: true
        })
      ],
      splitChunks: {
        cacheGroups: {
          commons: {
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors'
          }
        },
        chunks: 'all',
        maxInitialRequests: 10,
        minSize: 0,
        minChunks: 1,
        maxAsyncRequests: 4
      },
      moduleIds: 'hashed',
      nodeEnv: 'production',
      concatenateModules: true
    }
  },
  optimizer
)
