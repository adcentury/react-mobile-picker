const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = {
  mode: 'production',
  devServer: {
    contentBase: path.resolve(__dirname, '..', './dist'),
  },
  devtool: 'source-map',
  output: {
    filename: './lib/[name].js',
    library: 'Picker',
    libraryTarget: 'umd',
  },
}
