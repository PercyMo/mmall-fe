/*
 * @Author: PosyMo 
 * @Date: 2018-03-01 09:09:49 
 * @Last Modified by: PosyMo
 * @Last Modified time: 2018-03-26 16:43:26
 */
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _util = require('util/util.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string');

var page = {
    init: function() {
        this.onLoad();
    },
    onLoad: function() {
        // 初始化左侧菜单
        navSide.init({
            name: 'user-center'
        });
        this.loadUserInfo();
    },
    // 加载用户信息
    loadUserInfo: function() {
        var userHtml = '';
        _user.getUserInfo(function(res) {
            userHtml = _util.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function(errMsg) {
            _util.errorTip(errMsg);
        });
    }
};
$(function() {
    page.init();
});