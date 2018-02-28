/*
 * @Author: PosyMo 
 * @Date: 2018-02-28 11:32:05 
 * @Last Modified by: PosyMo
 * @Last Modified time: 2018-02-28 11:42:20
 */
'use strict';

var _util = require('util/util.js');

var _cart = {
    // 获取购物车数量
    getCartCount: function(resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/cart/get_cart_product_count.do'),
            success: resolve,
            error: reject
        });
    }
};

module.exports = _cart;