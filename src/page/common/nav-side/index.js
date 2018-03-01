/*
 * @Author: PosyMo 
 * @Date: 2018-03-01 09:32:47 
 * @Last Modified by: PosyMo
 * @Last Modified time: 2018-03-01 17:32:04
 */
'use strict';
require('./index.css');
var _util = require('util/util.js');
var templateIndex = require('./index.string');
// 侧边导航
var navSide = {
    option: {
        name: '',
        navList: [
            {name: 'user-center', desc: '个人中心', href: './user-center.html'},
            {name: 'order-list', desc: '我的订单', href: './order-list.html'},
            {name: 'user-pass-update', desc: '修改密码', href: './user-pass-update.html'},
            {name: 'about', desc: '关于mmall', href: './about.html'}
        ]
    },
    init: function(option) {
        // 合并选项
        $.extend(this.option, option);
        this.renderNav();
    },
    // 渲染导航菜单
    renderNav: function() {
        // 计算当前active
        for (var i = 0, len = this.option.navList.length; i < len; i++) {
            if (this.option.name === this.option.navList[i].name) {
                this.option.navList[i].isActive = true;
            }
        };
        // 渲染list数据
        var navHtml = _util.renderHtml(templateIndex, {
            navList: this.option.navList
        });
        // 把html放入容器
        $('.nav-side').html(navHtml);
    }
};

module.exports = navSide;