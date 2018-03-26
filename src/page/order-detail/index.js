/*
 * @Author: PosyMo 
 * @Date: 2018-03-26 08:51:12 
 * @Last Modified by: PosyMo
 * @Last Modified time: 2018-03-26 10:25:35
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

        // 临时数据
        var res = {
            "orderNo":1522024174272,
            "payment":38,
            "paymentType":1,
            "paymentTypeDesc":"在线支付",
            "postage":0,
            "status":10,
            "statusDesc":"未支付",
            "paymentTime":"",
            "sendTime":"",
            "endTime":"",
            "closeTime":"",
            "createTime":"2018-03-26 08:29:34",
            "orderItemVoList":[
                {
                    "orderNo":1522024174272,
                    "productId":40,
                    "productName":"【测试学习使用】aiben C-201四级听力耳机 调频无线收音机调频耳机 办公配件",
                    "productImage":"2bd2abc8-1c19-483f-8dbf-e741831f73ed.jpg",
                    "currentUnitPrice":38,
                    "quantity":1,
                    "totalPrice":38,
                    "createTime":"2018-03-26 08:29:34"
                }
            ],
            "imageHost":"http://img.happymmall.com/",
            "shippingId":6330,
            "receiverName":"按时",
            "shippingVo":{
                "receiverName":"按时",
                "receiverPhone":"15154745874",
                "receiverMobile":null,
                "receiverProvince":"山西省",
                "receiverCity":"吕梁",
                "receiverDistrict":null,
                "receiverAddress":"阿萨德",
                "receiverZip":"10000"
            }
        }
        _this.dataFilter(res);
        orderDetailHtml = _util.renderHtml(templateIndex, res);
        $content.html(orderDetailHtml);
        return;

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