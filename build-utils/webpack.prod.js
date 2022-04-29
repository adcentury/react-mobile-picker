const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: './lib/[name].js',
    library: 'Picker',
    libraryTarget: 'umd',
  },
}
