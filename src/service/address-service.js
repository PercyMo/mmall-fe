/*
 * @Author: PosyMo 
 * @Date: 2018-03-21 17:32:35 
 * @Last Modified by: PosyMo
 * @Last Modified time: 2018-03-21 17:43:35
 */
'use strict';

var _util = require('util/util.js');

var _address = {
    // 获取地址列表
    getAddressList: function(resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/shipping/list.do'),
            data: {
                pageSize: 50
            },
            success: resolve,
            error: reject
        });
    },
    // 新建收件人
    save: function(addressInfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/shipping/add.do'),
            data: addressInfo,
            success: resolve,
            error: reject
        });
    },
    // 更新收件人
    update: function(addressInfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/shipping/update.do'),
            data: addressInfo,
            success: resolve,
            error: reject
        });
    },
    // 删除收件人
    deleteAddress: function(shippingId, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/shipping/del.do'),
            data: {
                shippingId: shippingId
            },
            success: resolve,
            error: reject
        });
    },
    // 获取单条收件人信息
    getAddress: function(shippingId, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/shipping/select.do'),
            data: {
                shippingId: shippingId
            },
            success: resolve,
            error: reject
        });
    },
};

module.exports = _address;