/*
* @Author: PosyMo
* @Date:   2018-02-01 18:46:48
* @Last Modified by:   PosyMo
* @Last Modified time: 2018-02-26 16:27:44
*/
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 环境变量配置，dev / online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'

// 获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name, title) {
    return {
        title: title,
        filename: 'view/' + name + '.html',
        template: './src/view/' + name + '.html',
        inject: true,
        hash: true,
        chunks: ['common', name]
    }
};

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
        publicPath : '/dist',
        filename: 'js/[name].js'
    },
    resolve: {
        alias: {
            'node_modules': __dirname + '/node_modules',
            'util': __dirname + '/src/util',
            'page': __dirname + '/src/page',
            'service': __dirname + '/src/service',
            'image': __dirname + '/src/image'
        }
    },
    externals: {
        'jquery': 'jQuery'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=1000&name=resource/[hash:8].[name].[ext]' },
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
        // html模板处理
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
    ]
};

if ('dev' === WEBPACK_ENV) {
    config.entry.common.push('webpack-dev-server/client?http://localhost:7000/');
}

module.exports = config;