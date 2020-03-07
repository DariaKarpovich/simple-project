const path = require('path');
const WebpackBar = require('webpackbar');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output:{
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js'
    },
    context: path.resolve(__dirname, 'src'),
    resolve: {
        extensions: ['.wasm', '.mjs', '.js', '.json']
      },

    devServer: {
        port: 8080,
        compress: true,
        contentBase: path.join(__dirname, 'dist'),
        overlay: true,
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },

    stats: {
        colors: true
      },

    module: {
        rules: [

            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },

            {
                test: /\.(png|jpe?g|gif|woff|woff2|eot|ttf|svg)$/,
                use: ['url-loader'],
                exclude: /node_modules/,
            },

        ]
    },

    plugins: [
        new WebpackBar(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html')
        }),
        
    ]



}