/* -------------------------------------------------------------------------- */
/*                        SERVER WEBPACK CONFIGURATION                        */
/* -------------------------------------------------------------------------- */

const path = require('path')

const ROOT_DIR = path.resolve(__dirname, '..')
const resolvePath = (...args) => path.resolve(ROOT_DIR, ...args)
const SRC_DIR = resolvePath('src/index.js')
const BUILD_DIR = resolvePath('build')

const isDebug = !process.argv.includes('--release')
const isVerbose = process.argv.includes('--verbose')

module.exports = {
  name: 'server',
  entry: [SRC_DIR],
  // Don't attempt to continue if there are any errors.
  bail: !isDebug,
  cache: isDebug,
  output: {
    path: BUILD_DIR,
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].chunk.js'
  },
  target: 'node', // Make web variables accessible to webpack, e.g. window
  externals: [],
  node: {
    __filename: true,
    __dirname: true
  },
  module: {
    rules: [
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
      }
    ]
  },
  plugins: [],
  // Webpack mutates resolve object, so clone it to avoid issues
  // https://github.com/webpack/webpack/issues/4817
  resolve: {
    alias: {
      '@utils': resolvePath('src/utils'),
      '@middlewares': resolvePath('src/middlewares'),
      '@modules': resolvePath('src/modules')
    }
  },
  stats: {
    chunks: isVerbose,
    chunkModules: isVerbose,
    colors: true,
    timings: true,
    version: isVerbose,
    hash: isVerbose,
    modules: isVerbose
  }
}
