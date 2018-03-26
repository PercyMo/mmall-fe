/*
 * @Author: PosyMo 
 * @Date: 2018-03-21 15:23:17 
 * @Last Modified by: PosyMo
 * @Last Modified time: 2018-03-26 16:42:23
 */
'use strict';
require('./index.css');
require('page/common/header/index.js');
var nav = require('page/common/nav/index.js');
var _util = require('util/util.js');
var _address = require('service/address-service.js');
var _order = require('service/order-service.js');
var templateAddress = require('./address-list.string');
var templateProduct = require('./product-list.string');
var addressModal = require('./address-modal.js');

var page = {
    data: {
        selectedAddressId: null
    },
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        this.loadAddressList();
        this.loadProductList();
    },
    bindEvent: function() {
        var _this = this;
        // 地址的选择
        $(document).on('click', '.address-item', function() {
            $(this).addClass('active')
                .siblings('.address-item').removeClass('active');
            _this.data.selectedAddressId = $(this).data('id');
        });
        // 订单的提交
        $(document).on('click', '.order-submit', function() {
            var shippingId = _this.data.selectedAddressId;
            if (shippingId) {
                _order.creatOrder({
                    shippingId: shippingId
                }, function(res) {
                    window.location.href = './payment.html?orderNumber=' + res.orderNo;
                }, function(errMsg) {
                    _util.errorTip(errMsg);
                });
            } else {
                _util.errorTip('请选择地址后提交');
            }
        });
        // 添加地址
        $(document).on('click', '.address-add', function() {
            addressModal.show({
                isUpdate: false,
                onSuccess: function() {
                    _this.loadAddressList();
                }
            });
        });
        // 编辑地址
        $(document).on('click', '.address-update', function(e) {
            e.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');

            _address.getAddress(shippingId, function(res) {
                addressModal.show({
                    isUpdate: true,
                    data: res,
                    onSuccess: function() {
                        _this.loadAddressList();
                    }
                });
            }, function(errMsg) {
                _util.errorTip(errMsg);
            });
        });
        // 删除地址
        $(document).on('click', '.address-delete', function(e) {
            e.stopPropagation();
            var id = $(this).parents('.address-item').data('id');
            if (window.confirm('确认要删除该地址？')) {
                _address.deleteAddress(id, function(res) {
                    _this.loadAddressList();
                }, function(errMsg) {
                    _util.errorTip(errMsg);
                });
            }
        });
    },
    // 加载地址信息列表
    loadAddressList: function() {
        var _this = this;
        $('.adress-con').html('<div class="loading"></div>');
        _address.getAddressList(function(res) {
            _this.addressFilter(res);
            var addressListHtml = _util.renderHtml(templateAddress, res);
            $('.adress-con').html(addressListHtml);
        }, function(errMsg) {
            $('.adress-con').html('<p class="err-tip">地址加载失败，请刷新</p>');
        });
    },
    // 处理地址列表中的选中状态
    addressFilter: function(data) {
        if (this.data.selectedAddressId) {
            var selectedAddressIdFlag = false;
            for (var i = 0, len = data.list.length; i < len; i++) {
                if (data.list[i].id === this.data.selectedAddressId) {
                    data.list[i].isActive = true;
                    selectedAddressIdFlag = true;
                }
            }
            // 如果以前选中的地址不在列表里，将其删除
            if (!selectedAddressIdFlag) {
                this.data.selectedAddressId = null;
            }
        }
    },
    // 加载商品清单
    loadProductList: function() {
        var _this = this;
        $('.product-con').html('<div class="loading"></div>');
        _order.getProductList(function(res) {
            var productListHtml = _util.renderHtml(templateProduct, res);
            $('.product-con').html(productListHtml);
        }, function(errMsg) {
            $('.product-con').html('<p class="err-tip">商品清单加载失败，请刷新</p>');
        });
    }
};
$(function() {
    page.init();
});