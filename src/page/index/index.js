/*
* @Author: PosyMo
* @Date:   2018-01-31 19:43:28
* @Last Modified by:   PosyMo
* @Last Modified time: 2018-02-12 08:59:26
*/
'use strict';

require('./index.css');

var _util = require('../../util/util.js');

$(function() {
    $('.test').click(function() {
        console.log('测试请求')
        _util.request({
            url: 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg',
            data: {
                platform: 'h5',
                uin: 0,
                needNewCode: 1,
                g_tk: 5381,
                inCharset: 'utf-8',
                outCharset: 'utf-8',
                notice: 0,
                format: 'jsonp'
            },
            success: function(res) {
                console.log(res)
            }
        })
    })
});