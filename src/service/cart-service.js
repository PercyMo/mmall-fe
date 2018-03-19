/*
 * @Author: PosyMo 
 * @Date: 2018-02-28 11:32:05 
 * @Last Modified by: PosyMo
 * @Last Modified time: 2018-03-19 14:15:02
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
    },
    // 获取购物车列表
    getCartList: function(resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/cart/list.do'),
            success: resolve,
            error: reject
        });
    },
    // 选择购物车商品
    selectProduct: function(productId, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/cart/select.do'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject
        });
    },
    // 取消选择购物车商品
    unselectProduct: function(productId, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/cart/un_select.do'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject
        });
    },
    // 选中全部商品
    selectAllProduct: function(resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/cart/select_all.do'),
            success: resolve,
            error: reject
        });
    },
    // 取消选中全部商品
    unselectAllProduct: function(resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/cart/un_select_all.do'),
            success: resolve,
            error: reject
        });
    },
    // 更新购物车商品数量
    updateProduct: function(productInfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/cart/update.do'),
            data: productInfo,
            success: resolve,
            error: reject
        });
    },
    // 删除指定商品
    deleteProduct: function(productIds, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/cart/delete_product.do'),
            data: {
                productIds: productIds
            },
            success: resolve,
            error: reject
        });
    },
};

module.exports = _cart;