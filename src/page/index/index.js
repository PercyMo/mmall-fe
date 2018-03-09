/*
 * @Author: PosyMo 
 * @Date: 2018-03-09 15:20:20 
 * @Last Modified by: PosyMo
 * @Last Modified time: 2018-03-09 19:03:35
 */
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');
var _util = require('util/util.js');
var templateBanner = require('./banner.string');

$(function() {
    // 渲染banner的html
    var bannerHtml =  _util.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    // 初始化banner
    var $slider = $('.banner').unslider({
        dots: true
    });
    // 前一张和下一张绑定事件
    $('.banner-arrow').click(function() {
        var forword = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forword]();
    });
});