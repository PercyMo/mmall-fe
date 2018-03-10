/*
 * @Author: PosyMo 
 * @Date: 2018-03-10 16:12:13 
 * @Last Modified by: PosyMo
 * @Last Modified time: 2018-03-10 16:53:06
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
        listParam: {
            keyword: _util.getUrlParam('keyword') || '',
            categoryId: _util.getUrlParam('categoryId') || '',
            orderBy: _util.getUrlParam('orderBy') || 'default',
            pageNum: _util.getUrlParam('pageNum') || 1,
            pageSize: _util.getUrlParam('pageSize') || 20
        }
    },
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        this.loadList();
    },
    bindEvent: function() {
        
    },
    // 加载list数据
    loadList: function() {
        var _this = this,
            listHtml = '',
            listParam = this.data.listParam,
            $pListCon = $('.p-list-con');

        _product.getProductList(listParam, function(res) {
            listHtml = _util.renderHtml(templateIndex, {
                list: res.list
            });
            $pListCon.html(listHtml);
        }, function(errMsg) {
            _util.errorTip(errMsg);
        });
    }
};

$(function() {
    page.init();
});