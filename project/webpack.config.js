const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
              path: path.resolve(__dirname, './dist'),
              filename: 'main.js'
            },

    devServer: {
        port: 8080,
        compress: true,
        contentBase: path.join(__dirname, 'dist'),
        overlay: true,
    },

    stats: {
        colors: true
      },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html')
        }
            )
        ]
    
}