var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    path.join(__dirname, 'main.js')
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[hash].app.js'
  },

  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
      {test: /\.less$/, loader: 'style!css!autoprefixer!less'}
    ]
  },

  resolve: {
    alias: {
      'react-mobile-picker': path.join(__dirname, '..', 'src')
    }
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ]
};
