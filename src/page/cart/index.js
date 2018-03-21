/*
 * @Author: PosyMo 
 * @Date: 2018-03-17 14:52:24 
 * @Last Modified by: PosyMo
 * @Last Modified time: 2018-03-21 15:30:15
 */
'use strict';
require('./index.css');
require('page/common/header/index.js');
var nav = require('page/common/nav/index.js');
var _util = require('util/util.js');
var _cart = require('service/cart-service.js');
var templateIndex = require('./index.string');

var page = {
    data: {},
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        this.loadCart();
    },
    bindEvent: function() {
        var _this = this;
        // 商品的选择 / 取消选择
        $(document).on('click', '.cart-select', function() {
            var $this = $(this),
                productId = $this.parents('.cart-table').data('product-id');
            // 选中
            if ($this.is(':checked')) {
                _cart.selectProduct(productId, function(res) {
                    _this.renderCart(res);
                }, function(errMsg) {
                    _this.showCartError();
                });
            }
            // 取消选中
            else {
                _cart.unselectProduct(productId, function(res) {
                    _this.renderCart(res);
                }, function(errMsg) {
                    _this.showCartError();
                });
            }
        });
        // 商品的全选 / 取消全选
        $(document).on('click', '.cart-select-all', function() {
            var $this = $(this);
            // 选中
            if ($this.is(':checked')) {
                _cart.selectAllProduct(productId, function(res) {
                    _this.renderCart(res);
                }, function(errMsg) {
                    _this.showCartError();
                });
            }
            // 取消选中
            else {
                _cart.unselectAllProduct(productId, function(res) {
                    _this.renderCart(res);
                }, function(errMsg) {
                    _this.showCartError();
                });
            }
        });
        // 商品数量的变化
        $(document).on('click', '.count-btn', function() {
            var $this = $(this),
                $pCount = $this.siblings('.count-input'),
                currCount = parseInt($pCount.val()),
                type = $this.hasClass('minus') ? 'minus' : 'plus',
                productId = $this.parents('.cart-table').data('product-id'),
                minCount = 1,
                maxCount = parseInt($pCount.data('max'));
            if (type === 'plus') {
                if (currCount >= maxCount) {
                    _util.errorTip('该商品数量已达到上限');
                    return
                }
                currCount++;
            } else if (type === 'minus') {
                if (currCount <= minCount) {
                    return
                }
                currCount--;
            }
            // 更新购物车商品数量
            _cart.updateProduct({
                productId: productId,
                count: currCount
            }, function(res) {
                _this.renderCart(res);
            }, function(errMsg) {
                _this.showCartError();
            });
        });
        // 删除单个商品
        $(document).on('click', '.cart-delete', function() {
            if (window.confirm('确认要删除该商品？')) {
                var productId = $(this).parents('.cart-table')
                    .data('product-id');
                _this.deleteCartProduct(productId);
            }
        });
        // 删除选中商品
        $(document).on('click', '.delete-selected', function() {
            if (window.confirm('确认要删除选中的商品？')) {
                var arrProductIds = [],
                    $selectedItem = $('.cart-select:checked');
                for (var i = 0, len = $selectedItem.length; i < len; i++) {
                    arrProductIds.push($($selectedItem[i]).parents('.cart-table').data('product-id'));
                }
                if (arrProductIds.length) {
                    _this.deleteCartProduct(arrProductIds.join(','));
                } else {
                    _util.errorTip('您还没有选中要删除的商品');
                }
            }
        });
        // 提交购物车
        $(document).on('click', '.btn-submit', function() {
            if (_this.data.cartInfo && _this.data.cartInfo.productTotalPrice > 0) {
                window.location.href = './confirm.html';
            } else {
                _util.errorTip('请选择商品后再提交');
            }
        });
    },
    // 加载购物车信息
    loadCart: function() {
        // 临时数据
        var data = {
            cartProductVoList: [
                {
                    id: 14627,
                    userId: 5749,
                    productId: 26,
                    quantity: 3,
                    productName: "【测试学习使用】Apple iPhone 7 Plus (A1661) 128G手机",
                    productSubtitle: "iPhone 7，现更以lv色呈现。",
                    productMainImage: "241997c4-9e62-4824-b7f0-7425c3c28917.jpeg",
                    productPrice: 6997.00,
                    productStatus: 1,
                    productTotalPrice: 20991.00,
                    productStock: 119811,
                    productChecked: 1,
                    limitQuantity: "LIMIT_NUM_SUCCESS"
                },
                {
                    id: 14628,
                    userId: 5749,
                    productId: 40,
                    quantity: 3,
                    productName: "【测试学习使用】aiben C-201四级听力耳机 调频无线收音机调频耳机 办公配件",
                    productSubtitle: "调频无线收音机调频耳机",
                    productMainImage: "2bd2abc8-1c19-483f-8dbf-e741831f73ed.jpg",
                    productPrice: 38.00,
                    productStatus: 1,
                    productTotalPrice: 114.00,
                    productStock: 9934,
                    productChecked: 1,
                    limitQuantity: "LIMIT_NUM_SUCCESS"
                }
            ],
            cartTotalPrice: 21105.0,
            allChecked: true,
            imageHost: "http://img.happymmall.com/"
        }
        this.renderCart(data);
        return

        var _this = this;
        _cart.getCartList(function(res) {
            _this.renderCart(res);
        }, function(errMsg) {
            _this.showCartError();
        });
    },
    // 渲染购物车
    renderCart: function(data) {
        this.filter(data);
        // 缓存购物车信息
        this.data.cartInfo = data;
        var cartHtml = _util.renderHtml(templateIndex, data);
        $('.page-wrap').html(cartHtml);
        // 通知导航的购物车更新数量
        nav.loadCartCount();
    },
    // 删除指定商品，支持批量，productId用逗号分隔
    deleteCartProduct: function(productIds) {
        var _this = this;
        _cart.deleteProduct(productIds, function(res) {
            _this.renderCart(res);
        }, function(errMsg) {
            _this.showCartError();
        });
    },
    // 数据匹配
    filter: function(data) {
        data.notEmpty = !! data.cartProductVoList.length;
    },
    // 显示错误信息
    showCartError: function() {
        $('.page-wrap').html('<p class="err-tip">哪里不对了，刷新试试吧。</p>');
    }
};
$(function() {
    page.init();
});