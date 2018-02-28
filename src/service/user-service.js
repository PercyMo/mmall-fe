/*
 * @Author: PosyMo 
 * @Date: 2018-02-28 10:55:09 
 * @Last Modified by: PosyMo
 * @Last Modified time: 2018-02-28 11:18:20
 */
'use strict';

var _util = require('util/util.js');

var _user = {
    // 检查登录状态
    checkLogin: function(resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 登出
    logout: function(resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/user/logout.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    }
};

module.exports = _user;