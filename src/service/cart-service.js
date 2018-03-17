/*
 * @Author: PosyMo 
 * @Date: 2018-02-28 11:32:05 
 * @Last Modified by: PosyMo
 * @Last Modified time: 2018-03-17 10:47:16
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
    },
    // 添加到购物车
    addToCart: function(productInfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/cart/add.do'),
            data: productInfo,
            success: resolve,
            error: reject
        });
    }
};

module.exports = _cart;