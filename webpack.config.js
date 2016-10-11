var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: ['babel-polyfill', './src/main.js'],

  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },

  resolve: {
    extensions: ['', '.vue', '.js'],
    alias: {
      'assets': path.resolve(__dirname, './src/assets'),
      'components': path.resolve(__dirname, './src/components')
    }
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
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.txt$/,
      loader: 'raw'
    }]
  },

  eslint: {
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
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks: ({ resource }) => {
        return resource &&
          resource.includes(path.join(__dirname, './node_modules'))
      }
    })
  ])
}
