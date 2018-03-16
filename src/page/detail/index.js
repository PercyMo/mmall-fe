/*
 * @Author: PosyMo 
 * @Date: 2018-03-16 11:44:18 
 * @Last Modified by: PosyMo
 * @Last Modified time: 2018-03-16 15:52:54
 */
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _util = require('util/util.js');
var _product = require('service/product-service.js');
var templateIndex = require('./index.string');

var page = {
    data: {
        productId: _util.getUrlParam('productId') || ''
    },
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        // 如果没传productId，自动跳回首页
        if (!this.data.productId) {
            _util.goHome();
        }
        this.loadDetail();
    },
    bindEvent: function() {
        
    },
    loadDetail: function() {
        var _this = this,
            html = '',
            $pageWrap = $('.page-wrap');
        _product.getProductDetail(this.data.productId, function(res) {
            _this.filter(res);
            html = _util.renderHtml(templateIndex, res);
            $pageWrap.html(html);
        }, function(errMsg) {
            $pageWrap.html('<p class="err-tip">此商品太淘气，找不到了！</p>');
        });
    },
    filter: function(data) {
        data.subImages = data.subImages.split(',');
    }
};
$(function() {
    page.init();
});