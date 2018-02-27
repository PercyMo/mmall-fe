/*
 * @Author: PosyMo 
 * @Date: 2018-02-26 17:24:26 
 * @Last Modified by: PosyMo
 * @Last Modified time: 2018-02-27 20:07:22
 */
'use strict';
require('./index.css');
var _util = require('util/util.js');
// 导航
var nav = {
    init: function() {
        this.bindEvent();
        this.loadUserInfo();
        return this;
    },
    bindEvent: function() {
        // 登录点击事件
        $('.js-login').click(function() {
            _util.doLogin();
        });
        // 注册点击事件
        $('.js-register').click(function() {
            window.location.href = './user-register.html';
        });
        // 退出点击事件
        $('.js-logout').click(function() {
            console.log('logout');
        });
    },
    // 加载用户信息
    loadUserInfo: function() {
        
    }
};

module.exports = nav.init();