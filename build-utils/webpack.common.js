const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
  entry: {
    'react-mobile-picker': './src/index.js',
  },
  stats: { children: true },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
    ],
  },

  plugins: [
    new ESLintPlugin(),
  ],
}
