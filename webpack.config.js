const path = require('path');
const WebpackBar = require('webpackbar');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  mode: 'development',
  devtool: 'inline-source-map',
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
  },
  context: path.resolve(__dirname, 'src'),
  resolve: {
    extensions: ['.js', '.json'],
  },

  stats: {
    colors: true,
  },

  devServer: {
    port: 8080,
    compress: true,
    contentBase: path.resolve(__dirname, 'dist'),
    overlay: true,
  },

  module: {
    rules: [

      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },

      {
        test: /\.s[ac]ss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },

      {
        test: /\.(png|jpe?g|gif|woff|woff2|eot|ttf|svg)$/,
        use: ['url-loader'],
        exclude: /node_modules/,
      },

    ],
  },

  plugins: [
    new WebpackBar(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'PokemonAPI',
      template: path.resolve(__dirname, 'index.html'),
    }),
  ],
};