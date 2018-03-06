/*
 * @Author: PosyMo 
 * @Date: 2018-03-06 16:04:04 
 * @Last Modified by: PosyMo
 * @Last Modified time: 2018-03-06 18:49:53
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
    data: {
        username: '',
        question: '',
        answer: '',
        token: ''
    },
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        this.loadStepUsername();
    },
    bindEvent: function() {
        var _this = this
        // 输入用户名后下一步的点击
        $('#submit-username').click(function() {
            var username = $.trim($('#username').val());
            if (username) {
                _user.getQuestion(username, function(res) {
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();
                }, function(errMsg) {
                    formError.show(errMsg);
                });
            }
            // 用户名不存在
            else {
                formError.show('请输入用户名');
            }
        });
        // 输入密码提示问题答案后下一步的点击
        $('#submit-question').click(function() {
            var answer = $.trim($('#answer').val());
            // 密码提示问题答案存在
            if (answer) {
                _user.checkAnswer({
                    username: _this.data.username,
                    question: _this.data.question,
                    answer: answer
                }, function(res) {
                    _this.data.answer = answer;
                    _this.data.token = res;
                    _this.loadStepPassword();
                }, function(errMsg) {
                    formError.show(errMsg);
                });
            }
            // 密码提示问题答案不存在
            else {
                formError.show('请输入密码提示问题答案');
            }
        });
        // 输入新密码后下一步的点击
        $('#submit-password').click(function() {
            var password = $.trim($('#password').val());
            // 密码不为空
            if (password && password.length >=6) {
                _user.resetPassword({
                    username: _this.data.username,
                    passwordNew: password,
                    forgetToken: _this.data.token
                }, function(res) {
                    window.location.href = './result.html?type=pass-reset';
                }, function(errMsg) {
                    formError.show(errMsg);
                });
            }
            // 密码为空
            else {
                formError.show('请输入不少于6位的新密码');
            }
        });
    },
    // 第一步：加载输入用户名
    loadStepUsername: function() {
        $('.step-username').show();
    },
    // 第二步：加载输入密码提示问题答案
    loadStepQuestion: function() {
        // 消除错误提示
        formError.hide();
        // 容器切换
        $('.step-username').hide()
            .siblings('.step-question').show().
            find('.question').text(this.data.question);
    },
    // 第三步：加载输入password
    loadStepPassword: function() {
        // 消除错误提示
        formError.hide();
        // 容器切换
        $('.step-question').hide()
            .siblings('.step-password').show();
    }
};

$(function() {
    page.init();
});