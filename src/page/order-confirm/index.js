/*
 * @Author: PosyMo 
 * @Date: 2018-03-21 15:23:17 
 * @Last Modified by: PosyMo
 * @Last Modified time: 2018-03-21 19:37:46
 */
'use strict';
require('./index.css');
require('page/common/header/index.js');
var nav = require('page/common/nav/index.js');
var _util = require('util/util.js');
var _address = require('service/address-service.js');
var templateAddress = require('./address-list.string');

var page = {
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        this.loadAddressList();
    },
    bindEvent: function() {
        
    },
    // 加载地址信息列表
    loadAddressList: function() {
        var _this = this;
        $('.adress-con').html('<div class="loading"></div>');
        var res = {
            list: [
                {
                    id: 6327,
                    receiverName: "王磊",
                    receiverPhone: "15154758475",
                    receiverProvince: "辽宁省",
                    receiverCity: "抚顺",
                    receiverAddress: "阿萨德",
                },
                {
                    id: 6328,
                    receiverName: "刘旺",
                    receiverPhone: "15154747474",
                    receiverProvince: "山东省",
                    receiverCity: "枣庄",
                    receiverAddress: "阿萨德",
                },
                {
                    id: 6330,
                    receiverName: "张明明",
                    receiverPhone: "15154745874",
                    receiverProvince: "山西省",
                    receiverCity: "吕梁",
                    receiverAddress: "阿萨德",
                }
            ]
        };
        var addressListHtml = _util.renderHtml(templateAddress, res);
        $('.adress-con').html(addressListHtml);
        return;

        _address.getAddressList(function(res) {
            _this.addressFilter(res);
            var addressListHtml = _util.renderHtml(templateAddress, res);
            $('.adress-con').html(addressListHtml);
        }, function(errMsg) {
            $('.adress-con').html('<p class="err-tip">地址加载失败，请刷新</p>');
        });
    }
};
$(function() {
    page.init();
});