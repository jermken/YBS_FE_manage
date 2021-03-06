const path = require('path')
const merge = require('webpack-merge')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const baseConf = require('./webpack.base.config')

module.exports = merge(baseConf, {
    mode: process.env.NODE_ENV,
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index.js'
    },
    module: {

    },
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        historyApiFallback: true,
        hot: true,
        port: 8080,
        open: true,
        inline: true,
        progress: true
    },
    devtool: 'inline-source-map',
    plugins: [
        new htmlWebpackPlugin({
            title: '测试-依柏诗-钟村店',
            filename: './index.html',
            template: './src/entry/index.html',
            chunks: ['index'],
            env: process.env.NODE_ENV,
            inject: false,
            meta: {
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
            }
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
})
