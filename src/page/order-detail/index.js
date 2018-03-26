/*
 * @Author: PosyMo 
 * @Date: 2018-03-26 08:51:12 
 * @Last Modified by: PosyMo
 * @Last Modified time: 2018-03-26 16:42:32
 */
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _util = require('util/util.js');
var _order = require('service/order-service.js');
var templateIndex = require('./index.string');

var page = {
    data: {
        orderNumber: _util.getUrlParam('orderNumber')
    },
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        // 初始化左侧菜单
        navSide.init({
            name: 'order-list'
        });
        // 加载订单列表
        this.loadOrderDetail();
    },
    bindEvent: function() {
        $(document).on('click', '.order-cancel', function() {
            if (window.confirm('确定要取消订单？')) {
                _order.cancelOrder(_this.data.orderNumber), function(res) {
                    _util.successTip('订单取消成功');
                    _this.loadOrderDetail();
                }, function(errMsg) {
                    _util.errorTip(errMsg);
                };
            }
        });
    },
    loadOrderDetail: function() {
        var _this = this,
            orderDetailHtml = '',
            $content = $('.content');
        $content.html('<div class="loading"></div>');
        _order.getOrderDetail(this.data.orderNumber, function(res) {
            _this.dataFilter(res);
            // 渲染列表
            orderDetailHtml = _util.renderHtml(templateIndex, res);
            $content.html(orderDetailHtml);
        }, function(errMsg) {
            $content.html('<p class="err-tip">加载订单详情失败，请刷新</p>');
        });
    },
    dataFilter: function(data) {
        data.needPay = data.status == 10;
        data.isCancelable = data.status == 10;
    }
};

$(function() {
    page.init();
});