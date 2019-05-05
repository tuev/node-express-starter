const nodeExternals = require('webpack-node-externals')
const path = require('path')
process.env.NODE_ENV = 'testing'

module.exports = {
  target: 'node',
  output: {
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  resolve: {
    alias: {
      '~/testhelpers': path.resolve(__dirname, 'test/helpers'),
      '~testhelpers': path.resolve(__dirname, 'test/helpers'),
      '~apiTest': path.resolve(__dirname, 'test/apiTest'),
      '~/apiTest': path.resolve(__dirname, 'test/apiTest'),
      '~/config': path.resolve(__dirname, 'src/config/index')
    }
  },
  devtool: 'cheap-module-source-map',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-regenerator', '@babel/plugin-transform-runtime']
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  }
}
