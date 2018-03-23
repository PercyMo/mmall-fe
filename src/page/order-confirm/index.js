/*
 * @Author: PosyMo 
 * @Date: 2018-03-21 15:23:17 
 * @Last Modified by: PosyMo
 * @Last Modified time: 2018-03-23 17:08:11
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

            // 临时数据
            var res = {
                id:6328,
                receiverName:"刘旺",
                receiverPhone:"15154747474",
                receiverProvince:"山东省",
                receiverCity:"枣庄",
                receiverAddress:"阿萨德",
                receiverZip:"100000"
            };
            addressModal.show({
                isUpdate: true,
                data: res,
                onSuccess: function() {
                    _this.loadAddressList();
                }
            });
            return;

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
        // 临时数据
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
        _this.addressFilter(res);
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
        // 临时数据
        var res = {
            orderItemVoList:[
                {
                    productId:26,
                    productName:"【测试学习使用】Apple iPhone 7 Plus (A1661) 128G手机",
                    productImage:"241997c4-9e62-4824-b7f0-7425c3c28917.jpeg",
                    currentUnitPrice:6997,
                    quantity:2,
                    totalPrice:13994,
                },
                {
                    productId:40,
                    productName:"【测试学习使用】aiben C-201四级听力耳机 调频无线收音机调频耳机 办公配件",
                    productImage:"2bd2abc8-1c19-483f-8dbf-e741831f73ed.jpg",
                    currentUnitPrice:38,
                    quantity:3,
                    totalPrice:114,
                }
            ],
            productTotalPrice:14108,
            imageHost:"http://img.happymmall.com/"
        };
        var productListHtml = _util.renderHtml(templateProduct, res);
        $('.product-con').html(productListHtml);
        return;

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