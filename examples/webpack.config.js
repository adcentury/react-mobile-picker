var path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, 'main.js')
  ],

  output: {
    path: path.join(__dirname, '__build__'),
    publicPath: '/__build__/',
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
    // loaders: [
    //   {test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
    //   {test: /\.less$/, loader: 'style!css!autoprefixer!less'}
    // ]

  resolve: {
    alias: {
      'react-mobile-picker': path.join(__dirname, '..', 'src')
    }
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
};
