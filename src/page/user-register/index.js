/*
 * @Author: PosyMo 
 * @Date: 2018-03-03 17:56:43 
 * @Last Modified by: PosyMo
 * @Last Modified time: 2018-03-05 19:28:17
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
        // 验证username
        $('#username').blur(function() {
            var username = $.trim($(this).val());
            // 如果用户名为空，不做验证
            if (!username) {
                return;
            }
            // 异步验证用户名是否已经存在
            _user.checkUsername(username, function(res) {
                formError.hide();
            }, function(errMsg) {
                formError.show(errMsg);
            });
        });
        // 点击注册按钮
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
                password: $.trim($('#password').val()),
                passwordConfirm: $.trim($('#password-confirm').val()),
                phone: $.trim($('#phone').val()),
                email: $.trim($('#email').val()),
                question: $.trim($('#question').val()),
                answer: $.trim($('#answer').val())
            },
            // 表单验证结果
            validateResult = this.formValidate(formData);
            // 验证成功
            if (validateResult.status) {
                _user.register(formData, function() {
                    window.location.href = './result.html?type=register';
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
        if (formData.password.length < 6) {
            result.msg = '密码长度不能小于6位';
            return result;
        }
        if (formData.password !== formData.passwordConfirm) {
            result.msg = '两次输入的密码不一致';
            return result;
        }
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