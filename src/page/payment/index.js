/*
 * @Author: PosyMo 
 * @Date: 2018-03-26 14:10:45 
 * @Last Modified by: PosyMo
 * @Last Modified time: 2018-03-26 15:05:43
 */
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _util = require('util/util.js');
var _payment = require('service/payment-service.js');
var templateIndex = require('./index.string');

var page = {
    data: {
        orderNumber: _util.getUrlParam('orderNumber')
    },
    init: function() {
        this.onLoad();
    },
    onLoad: function() {
        this.loadPaymentInfo();
    },
    loadPaymentInfo: function() {
        var _this = this,
            paymentHtml = '',
            $pageWrap = $('.page-wrap')
        $pageWrap.html('<div class="loading"></div>');

        // 临时数据
        var res = {
            "orderNo": "1522024174272",
            "qrUrl": "http://img.happymmall.com/qr-1522024174272.png"
        };
        paymentHtml = _util.renderHtml(templateIndex, res);
        $pageWrap.html(paymentHtml);
        return;

        _payment.getPaymentInfo(this.data.orderNumber, function(res) {
            paymentHtml = _util.renderHtml(templateIndex, res);
            $pageWrap.html(paymentHtml);
            _this.listenOrderStatus();
        }, function(errMsg) {
            $pageWrap.html('<p class="err-tip">' + errMsg + '</p>');
        });
    },
    listenOrderStatus: function() {
        var _this = this;
        this.paymentTimer = window.setInterval(function() {
            _payment.getPaymentStatus(_this.data.orderNumber, function(res) {
                if (res == true) {
                    window.location.href = './result.html?type=payment&orderNumber=' + _this.data.orderNumber;
                }
            }, function(errMsg) {
            });
        }, 2000);
    }
};

$(function() {
    page.init();
});