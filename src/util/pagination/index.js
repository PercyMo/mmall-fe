/*
 * @Author: PosyMo 
 * @Date: 2018-03-14 10:08:55 
 * @Last Modified by: PosyMo
 * @Last Modified time: 2018-03-15 09:42:32
 */
'use strict';
require('./index.css');
var _util = require('util/util.js');
var templateIndex = require('./index.string');

var Pagination = function() {
    var _this = this;
    this.defaultOption = {
        container: null,
        pageNum: 1,
        pageRange: 3,
        onSelectPage: null
    };
    // 事件处理
    $(document).on('click','.pg-item' , function() {
        var $this = $(this);
        // 对active 和 disabled 按钮，不做处理
        if ($this.hasClass('active') || $this.hasClass('disabled')) {
            return;
        }
        typeof _this.option.onSelectPage === 'function'
            ? _this.option.onSelectPage($this.data('value')) : null;
    });
}
// 渲染分页组件
Pagination.prototype.render = function(userOption) {
    // 合并选项
    this.option = $.extend({}, this.defaultOption, userOption);
    // 判断容器是否为合法的jQuery对象
    if (!(this.option.container instanceof jQuery)) {
        return;
    }
    // 判断是否只有1页
    if (this.option.pages <= 1) {
        return;
    }
    // 渲染分页内容
    this.option.container.html(this.getPaginationHtml());
}
// 获取分页的html，|上一页| 2 3 4 =5= 6 7 8 |下一页|  5/9
Pagination.prototype.getPaginationHtml = function() {
    var html = '',
        option = this.option,
        pageArray = [],
        start = option.pageNum - option.pageRange > 0
            ? option.pageNum - option.pageRange : 1,
        end = option.pageNum + option.pageRange < option.pages
            ? option.pageNum + option.pageRange : option.pages;
    // 上一页按钮的数据
    pageArray.push({
        name: '上一页',
        value: option.prePage,
        disabled: !option.hasPreviousPage
    });
    // 数字按钮的处理
    for (var i = start; i <= end; i++) {
        pageArray.push({
            name: i,
            value: i,
            active: (i === option.pageNum)
        });
    };
    // 下一页按钮的数据
    pageArray.push({
        name: '下一页',
        value: option.nextPage,
        disabled: !option.hasNextPage
    });
    html = _util.renderHtml(templateIndex, {
        pageArray: pageArray,
        pageNum: option.pageNum,
        pages: option.pages
    });
    return html;
}

module.exports = Pagination;