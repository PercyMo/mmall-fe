/*
* @Author: PosyMo
* @Date:   2018-02-01 18:46:48
* @Last Modified by:   PosyMo
* @Last Modified time: 2018-02-08 15:09:17
*/
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

// webpack config
var config = {
    // js多入口
    entry: {
        'common': ['./src/page/common/index.js'],// 通用js模块
        'index': ['./src/page/index/index.js'],
        'user-login': ['./src/page/user-login/index.js']
    },
    output: {
        path: './dist',
        filename: 'js/[name].js'
    },
    externals: {
        'jquery': 'jQuery'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") }
        ]
    },
    plugins: [
        // 独立通用模块打包进js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js',
        }),
        // 把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
    ]
};

module.exports = config;