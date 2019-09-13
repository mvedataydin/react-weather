const HtmlWebPackPlugin = require('html-webpack-plugin');
module.exports = {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader'
      },
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ]
};
