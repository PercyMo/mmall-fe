/*
* @Author: PosyMo
* @Date:   2018-01-31 19:43:28
* @Last Modified by:   PosyMo
* @Last Modified time: 2018-02-25 19:37:16
*/
'use strict';

require('./index.css');

var _util = require('util/util.js');

var template = '<div>Hey! I am {{name}}!</div>';
var data = {
    name: 'PosyMo'
};
console.log(_util.renderHtml(template, data));

$(function() {
    $('.test').click(function() {
        _util.request({
            url: '/product/list.do',
            data: {
                keyword: 1
            },
            success: function(res) {
            }
        })
    })
});