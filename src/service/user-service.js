/*
 * @Author: PosyMo 
 * @Date: 2018-02-28 10:55:09 
 * @Last Modified by: PosyMo
 * @Last Modified time: 2018-03-06 18:42:36
 */
'use strict';

var _util = require('util/util.js');

var _user = {
    // 用户登录
    login: function(userinfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/user/login.do'),
            data: userinfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 检查用户名
    checkUsername: function(username, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/user/check_valid.do'),
            data: {
                type: 'username',
                str: username
            },
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 用户注册
    register: function(userinfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/user/register.do'),
            data: userinfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 检查登录状态
    checkLogin: function(resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 获取用户密码提示问题
    getQuestion: function(username, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/user/forget_get_question.do'),
            data: {
                username: username
            },
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 检查密码提示问题答案
    checkAnswer: function(userInfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/user/forget_check_answer.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 重置密码
    resetPassword: function(userInfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/user/forget_reset_password.do'),
            data: userInfo,
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