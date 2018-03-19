/*
 * @Author: PosyMo 
 * @Date: 2018-03-17 14:52:24 
 * @Last Modified by: PosyMo
 * @Last Modified time: 2018-03-19 14:39:53
 */
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _util = require('util/util.js');
var _cart = require('service/cart-service.js');
var templateIndex = require('./index.string');

var page = {
    data: {},
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        this.loadCart();
    },
    bindEvent: function() {
        
    },
    // 加载购物车信息
    loadCart: function() {
        // 临时数据
        var data = {
            cartProductVoList: [
                {
                    id: 14627,
                    userId: 5749,
                    productId: 26,
                    quantity: 3,
                    productName: "【测试学习使用】Apple iPhone 7 Plus (A1661) 128G手机",
                    productSubtitle: "iPhone 7，现更以lv色呈现。",
                    productMainImage: "241997c4-9e62-4824-b7f0-7425c3c28917.jpeg",
                    productPrice: 6997.00,
                    productStatus: 1,
                    productTotalPrice: 20991.00,
                    productStock: 119811,
                    productChecked: 1,
                    limitQuantity: "LIMIT_NUM_SUCCESS"
                },
                {
                    id: 14628,
                    userId: 5749,
                    productId: 40,
                    quantity: 3,
                    productName: "【测试学习使用】aiben C-201四级听力耳机 调频无线收音机调频耳机 办公配件",
                    productSubtitle: "调频无线收音机调频耳机",
                    productMainImage: "2bd2abc8-1c19-483f-8dbf-e741831f73ed.jpg",
                    productPrice: 38.00,
                    productStatus: 1,
                    productTotalPrice: 114.00,
                    productStock: 9934,
                    productChecked: 1,
                    limitQuantity: "LIMIT_NUM_SUCCESS"
                }
            ],
            cartTotalPrice: 21105.0,
            allChecked: true,
            imageHost: "http://img.happymmall.com/"
        }
        this.renderCart(data);
        return

        var _this = this;
        _cart.getCartList(function(res) {
            _this.renderCart(res);
        }, function(errMsg) {
            _this.showCartError();
        });
    },
    // 渲染购物车
    renderCart: function(data) {
        this.filter(data);
        // 缓存购物车信息
        this.data.cartInfo = data;
        var cartHtml = _util.renderHtml(templateIndex, data);
        $('.page-wrap').html(cartHtml);
    },
    // 数据匹配
    filter: function(data) {
        data.notEmpty = !! data.cartProductVoList.length;
    },
    // 显示错误信息
    showCartError: function() {
        $('.page-wrap').html('<p class="err-tip">哪里不对了，刷新试试吧。</p>');
    }
};
$(function() {
    page.init();
});