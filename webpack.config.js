var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/main.js',

  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },

  resolve: {
    extensions: ['', '.vue', '.js', '.json']
  },

  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },

  module: {
    preLoaders: [{
      test: /\.vue$/,
      loader: 'eslint',
      exclude: /node_modules/
    }, {
      test: /\.js$/,
      loader: 'eslint',
      exclude: /node_modules/
    }],

    loaders: [{
      test: /\.vue$/,
      loader: 'vue'
    }, {
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'url',
      query: {
        limit: 10000,
        name: '[name].[hash:7].[ext]'
      }
    }]
  },

  eslint: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: true
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      vue: {
        loaders: {
          sass: 'vue-style!css!postcss!sass?indentedSyntax'
        },

        postcss: [require('autoprefixer')()]
      }
    })
  ],

  devServer: {
    historyApiFallback: true,
    noInfo: true
  },

  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'

  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])
}
