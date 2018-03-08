/*
 * @Author: PosyMo 
 * @Date: 2018-03-07 14:19:20 
 * @Last Modified by: PosyMo
 * @Last Modified time: 2018-03-07 15:10:01
 */
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _util = require('util/util.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string');

var page = {
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        // 初始化左侧菜单
        navSide.init({
            name: 'user-center'
        });
        this.loadUserInfo();
    },
    bindEvent: function() {
        var _this = this;
        // 点击提交按钮后的动作
        $(document).on('click', '.btn-submit', function() {
            var userInfo = {
                phone: $.trim($('#phone').val()),
                email: $.trim($('#email').val()),
                question: $.trim($('#question').val()),
                answer: $.trim($('#answer').val())
            },
            validateResult = _this.validateForm(userInfo);
            if (validateResult.status) {
                // 更改用户信息
                _user.updateUserInfo(userInfo, function(res, msg) {
                    _util.successTip(msg);
                    window.location.href = './user-center.html';
                }, function(errMsg) {
                    _util.errorTip(errMsg);
                });
            }
            else {
                _util.errorTip(validateResult.msg);
            }
        });
    },
    // 加载用户信息
    loadUserInfo: function() {
        var userHtml = '';
        // _user.getUserInfo(function(res) {
            
            // 临时数据
            var res = {
                answer: "猫",
                email: "1213374871@qq.com",
                phone: '13280112906',
                question: "我是",
                username: "maobangxin",
            };

            userHtml = _util.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        // }, function(errMsg) {
        //     _util.errorTip(errMsg);
        // });
    },
    validateForm: function(formData) {
        var result = {
            status: false,
            msg: ''
        };
        if (!_util.validate(formData.phone, 'phone')) {
            result.msg = '手机号格式不正确';
            return result;
        }
        if (!_util.validate(formData.email, 'email')) {
            result.msg = '邮箱格式不正确';
            return result;
        }
        if (!_util.validate(formData.question, 'require')) {
            result.msg = '密码提示问题不能为空';
            return result;
        }
        if (!_util.validate(formData.answer, 'require')) {
            result.msg = '密码提示问题答案不能为空';
            return result;
        }   
        // 通过验证，返回正确提示
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};
$(function() {
    page.init();
});