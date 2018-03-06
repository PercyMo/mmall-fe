/*
 * @Author: PosyMo 
 * @Date: 2018-03-02 15:56:16 
 * @Last Modified by: PosyMo
 * @Last Modified time: 2018-03-06 08:50:27
 */
'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _user = require('service/user-service.js');
var _util = require('util/util.js');

// 表单错误提示
var formError = {
    show: function(errMsg) {
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide: function() {
        $('.error-item').hide().find('.err-msg').text('');
    }
};

// 页面逻辑
var page = {
    init: function() {
        this.bindEvent();
    },
    bindEvent: function() {
        var _this = this
        // 点击登录按钮
        $('#submit').click(function() {
            _this.submit();
        });
        // 按下回车，进行提交
        $('.user-content').keyup(function(e) {
            // keycode == 13 表示回车键
            if (e.keyCode === 13) {
                _this.submit();
            }
        });
    },
    submit: function() {
        var formData = {
                username: $.trim($('#username').val()),
                password: $.trim($('#password').val())
            },
            // 表单验证结果
            validateResult = this.formValidate(formData);
            // 验证成功
            if (validateResult.status) {
                _user.login(formData, function() {
                    window.location.href = _util.getUrlParam('redirect') || './index.html';
                }, function(errMsg) {
                    formError.show(errMsg);
                });
            }
            // 验证失败
            else {
                formError.show(validateResult.msg);
            }
    },
    formValidate: function(formData) {
        var result = {
            status: false,
            msg: ''
        };
        if (!_util.validate(formData.username, 'require')) {
            result.msg = '用户名不能为空';
            return result;
        }
        if (!_util.validate(formData.password, 'require')) {
            result.msg = '密码不能为空';
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