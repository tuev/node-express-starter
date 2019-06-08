const nodeExternals = require('webpack-node-externals')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const Dotenv = require('dotenv-webpack')

const isCoverage = process.env.NODE_ENV === 'test'
const path = require('path')

const ROOT_DIR = path.resolve(__dirname, '..')
const resolvePath = (...args) => path.resolve(ROOT_DIR, ...args)

module.exports = {
  mode: 'development',
  output: {
    // use absolute paths in sourcemaps (important for debugging via IDE)
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  module: {
    rules: [].concat(
      isCoverage
        ? {
          test: /\.(js|ts)/,
          include: path.resolve('src'), // instrument only testing sources with Istanbul, after ts-loader runs
          loader: 'istanbul-instrumenter-loader',
          options: {
            esModules: true
          }
        }
        : [],
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime']
            }
          }
        ],
        exclude: ['/node_modules/', '/build']
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: 'file-loader'
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'graphql-tag/loader'
          }
        ]
      }
    )
  },
  target: 'node', // webpack should compile node compatible code
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  devtool: 'inline-cheap-module-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new Dotenv({
      path: './.env.test'
    })
  ],
  resolve: {
    alias: {
      '@utils': resolvePath('src/utils'),
      '@middlewares': resolvePath('src/middlewares'),
      '@modules': resolvePath('src/modules'),
      test: resolvePath('test/')
    }
  }
}
