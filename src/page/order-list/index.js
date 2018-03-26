/*
 * @Author: PosyMo 
 * @Date: 2018-03-24 15:45:50 
 * @Last Modified by: PosyMo
 * @Last Modified time: 2018-03-26 08:26:21
 */
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _util = require('util/util.js');
var _order = require('service/order-service.js');
var Pagination = require('util/pagination/index.js');
var templateIndex = require('./index.string');

var page = {
    data: {
        listParam: {
            pageNum: 1,
            pageSize: 10
        }
    },
    init: function() {
        this.onLoad();
    },
    onLoad: function() {
        // 初始化左侧菜单
        navSide.init({
            name: 'order-list'
        });
        // 加载订单列表
        this.loadOrderList();
    },
    loadOrderList: function() {
        var _this = this,
            orderListHtml = '',
            $listCon = $('.order-list-con');
        $listCon.html('<div class="loading"></div>');

        // 临时数据
        var res = {
            "pageNum":1,
            "pageSize":10,
            "size":2,
            "orderBy":null,
            "startRow":1,
            "endRow":2,
            "total":2,
            "pages":4,
            "list":[
                {
                    "orderNo":1521875198540,
                    "payment":4199,
                    "paymentType":1,
                    "paymentTypeDesc":"在线支付",
                    "postage":0,
                    "status":10,
                    "statusDesc":"未支付",
                    "paymentTime":"",
                    "sendTime":"",
                    "endTime":"",
                    "closeTime":"",
                    "createTime":"2018-03-24 15:06:38",
                    "orderItemVoList":[
                        {
                            "orderNo":1521875198540,
                            "productId":34,
                            "productName":"【测试学习使用】Hisense/海信 LED55EC720US 55吋4K高清智能网络平板液晶电视机",
                            "productImage":"dce7d4e1-98f2-485c-a365-e70015c780a1.jpg",
                            "currentUnitPrice":4199,
                            "quantity":1,
                            "totalPrice":4199,
                            "createTime":"2018-03-24 15:06:38"
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
                },
                {
                    "orderNo":1521796560883,
                    "payment":14108,
                    "paymentType":1,
                    "paymentTypeDesc":"在线支付",
                    "postage":0,
                    "status":0,
                    "statusDesc":"已取消",
                    "paymentTime":"",
                    "sendTime":"",
                    "endTime":"",
                    "closeTime":"",
                    "createTime":"2018-03-23 17:16:00",
                    "orderItemVoList":[
                        {
                            "orderNo":1521796560883,
                            "productId":26,
                            "productName":"【测试学习使用】Apple iPhone 7 Plus (A1661) 128G手机",
                            "productImage":"241997c4-9e62-4824-b7f0-7425c3c28917.jpeg",
                            "currentUnitPrice":6997,
                            "quantity":2,
                            "totalPrice":13994,
                            "createTime":"2018-03-23 17:16:00"
                        },
                        {
                            "orderNo":1521796560883,
                            "productId":40,
                            "productName":"【测试学习使用】aiben C-201四级听力耳机 调频无线收音机调频耳机 办公配件",
                            "productImage":"2bd2abc8-1c19-483f-8dbf-e741831f73ed.jpg",
                            "currentUnitPrice":38,
                            "quantity":3,
                            "totalPrice":114,
                            "createTime":"2018-03-23 17:16:00"
                        }
                    ],
                    "imageHost":"http://img.happymmall.com/",
                    "shippingId":6328,
                    "receiverName":"刘旺",
                    "shippingVo":{
                        "receiverName":"刘旺",
                        "receiverPhone":"15154747474",
                        "receiverMobile":null,
                        "receiverProvince":"山东省",
                        "receiverCity":"枣庄",
                        "receiverDistrict":null,
                        "receiverAddress":"阿萨德",
                        "receiverZip":"100000"
                    }
                }
            ],
            "firstPage":1,
            "prePage":0,
            "nextPage":2,
            "lastPage":1,
            "isFirstPage":true,
            "isLastPage":true,
            "hasPreviousPage":false,
            "hasNextPage":true,
            "navigatePages":8,
            "navigatepageNums":[1]
        };
        orderListHtml = _util.renderHtml(templateIndex, res);
        $listCon.html(orderListHtml);
        _this.loadPagination({
            hasPreviousPage: res.hasPreviousPage,
            prePage: res.prePage,
            hasNextPage: res.hasNextPage,
            nextPage: res.nextPage,
            pageNum: res.pageNum,
            pages: res.pages
        });
        return;

        _order.getOrderList(this.data.listParam, function(res) {
            // 渲染列表
            orderListHtml = _util.renderHtml(templateIndex, res);
            $listCon.html(orderListHtml);
            // 初始化分页组件
            _this.loadPagination({
                hasPreviousPage: res.hasPreviousPage,
                prePage: res.prePage,
                hasNextPage: res.hasNextPage,
                nextPage: res.nextPage,
                pageNum: res.pageNum,
                pages: res.pages
            });
        }, function(errMsg) {
            $listCon.html('<p class="err-tip">加载订单列表失败，请刷新</p>');
        });
    },
    loadPagination: function(pageInfo) {
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container: $('.pagination'),
            onSelectPage: function(pageNum) {
                _this.data.listParam.pageNum = pageNum;
                _this.loadOrderList();
            }
        }));
    }
};

$(function() {
    page.init();
});