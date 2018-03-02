/*
 * @Author: PosyMo 
 * @Date: 2018-03-02 10:14:05 
 * @Last Modified by: PosyMo
 * @Last Modified time: 2018-03-02 10:47:17
 */
'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _util = require('util/util.js');

$(function() {
    var type = _util.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');
    // 显示对应的提示元素
    $element.show();
});