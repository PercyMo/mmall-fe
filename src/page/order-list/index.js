/*
 * @Author: PosyMo 
 * @Date: 2018-03-24 15:45:50 
 * @Last Modified by: PosyMo
 * @Last Modified time: 2018-03-26 16:42:43
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