/*
 * @Author: PosyMo 
 * @Date: 2018-03-10 16:36:05 
 * @Last Modified by: PosyMo
 * @Last Modified time: 2018-03-10 16:39:33
 */
'use strict';

var _util = require('util/util.js');

var _prodct = {
    // 获取商品列表
    getProductList: function(listParam, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/product/list.do'),
            data: listParam,
            success: resolve,
            error: reject
        });
    }
};

module.exports = _prodct;