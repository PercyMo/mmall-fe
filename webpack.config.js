/*
* @Author: PosyMo
* @Date:   2018-02-01 18:46:48
* @Last Modified by:   PosyMo
* @Last Modified time: 2018-02-07 19:34:20
*/
// webpack
var config = {
    // js多入口
    entry: {
        'index': ['./src/page/index/index.js'],
        'user-login': ['./src/page/user-login/index.js']
    },
    output: {
        path: './dist',
        filename: 'js/[name].js'
    }
}

module.exports = config;