const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    "react-mobile-picker-mod": "./src/index.js",
  },

  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "react-mobile-picker.js",
    library: "Picker",
    libraryTarget: "umd",
  },

  target: ["web", "es5"], // supports Internet Explorer 11 and below

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
};
