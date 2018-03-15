/*
 * @Author: PosyMo 
 * @Date: 2018-03-10 16:12:13 
 * @Last Modified by: PosyMo
 * @Last Modified time: 2018-03-15 09:42:37
 */
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _util = require('util/util.js');
var _product = require('service/product-service.js');
var Pagination = require('util/pagination/index.js');
var templateIndex = require('./index.string');

var page = {
    data: {
        listParam: {
            keyword: _util.getUrlParam('keyword') || '',
            categoryId: _util.getUrlParam('categoryId') || '',
            orderBy: _util.getUrlParam('orderBy') || 'default',
            pageNum: _util.getUrlParam('pageNum') || 1,
            pageSize: _util.getUrlParam('pageSize') || 1
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
        var _this = this;
        // 排序的点击事件
        $('.sort-item').click(function() {
            var $this = $(this);
            // 点击默认排序
            if ($this.data('type') === 'default') {
                // 已经是active样式
                if ($this.hasClass('active')) {
                    return;
                }
                // 其他
                else {
                    $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default';
                }
            }
            // 点击价格排序
            else if ($this.data('type') === 'price') {
                $this.addClass('active').siblings('.sort-item')
                .removeClass('active asc desc');
                // 升序、降序的处理
                if ($this.hasClass('asc')) {
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';
                } else {
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                }
            }
            // 重新加载列表
            _this.loadList();
        });
    },
    // 加载list数据
    loadList: function() {
        var _this = this,
            listHtml = '',
            listParam = this.data.listParam,
            $pListCon = $('.p-list-con');
        $pListCon.html('<li><div class="loading"></div></li>');
        // 删除参数中不必要的接口
        listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);
        // 请求接口
        _product.getProductList(listParam, function(res) {
            listHtml = _util.renderHtml(templateIndex, {
                list: res.list
            });
            $pListCon.html(listHtml);
            _this.loadPagination({
                hasPreviousPage: res.hasPreviousPage,
                prePage: res.prePage,
                hasNextPage: res.hasNextPage,
                nextPage: res.nextPage,
                pageNum: res.pageNum,
                pages: res.pages
            });
        }, function(errMsg) {
            _util.errorTip(errMsg);
        });
    },
    loadPagination: function(pageInfo) {
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container: $('.pagination'),
            onSelectPage: function(pageNum) {
                _this.data.listParam.pageNum = pageNum;
                _this.loadList();
            }
        }));
    }
};

$(function() {
    page.init();
});