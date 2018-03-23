/*
 * @Author: PosyMo 
 * @Date: 2018-03-22 11:49:26 
 * @Last Modified by: PosyMo
 * @Last Modified time: 2018-03-23 17:01:04
 */
'use strict';
var _util = require('util/util.js');
var _cities = require('util/cities/index.js');
var _address = require('service/address-service.js');
var templateAddressModal = require('./address-modal.string');

var addressModal = {
    show: function(option) {
        this.option = option;
        this.option.data = option.data || {};
        this.$modalWrap = $('.modal-wrap');
        this.loadModal();
        this.bindEvent();
    },
    bindEvent: function() {
        var _this = this;
        // 城市和省份二级联动
        this.$modalWrap.find('#receiver-province').change(function() {
            var selectProvince = $(this).val();
            _this.loadCities(selectProvince);
        });
        // 提交收货地址
        this.$modalWrap.find('.address-btn').click(function() {
            var receiverInfo = _this.getReceiverInfo(),
                isUpdate = _this.option.isUpdate;
            if (!isUpdate && receiverInfo.status) {
                _address.save(receiverInfo.data, function(res) {
                    _util.successTip('地址添加成功');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function'
                    && _this.option.onSuccess(res);
                }, function(errMsg) {
                    _util.errorTip(errMsg);
                });
            } else {
                _util.errorTip(receiverInfo.msg || '验证未通过~');
            }
        });
        // 清除弹窗的事件冒泡
        this.$modalWrap.find('.modal-container').click(function(e) {
            e.stopPropagation();
        });
        this.$modalWrap.find('.close').click(function() {
            _this.hide();
        });
    },
    loadModal: function() {
        var addressModalHtml = _util.renderHtml(templateAddressModal, {
            isUpdate: this.option.isUpdate,
            data: this.option.data
        });
        this.$modalWrap.html(addressModalHtml);
        // 加载省份
        this.loadProvince();
    },
    loadProvince: function() {
        var provinces = _cities.getProvinces() || [],
            $provinceSelect = this.$modalWrap.find('#receiver-province');
        $provinceSelect.html(this.getSelectOption(provinces));
        // 如果是更新地址，并且有省份信息，做省份的回填
        if (this.option.isUpdate && this.option.data.receiverProvince) {
            $provinceSelect.val(this.option.data.receiverProvince);
            this.loadCities(this.option.data.receiverProvince);
        }
    },
    loadCities: function(provinceName) {
        var cities = _cities.getCities(provinceName) || [],
            $citySelect = this.$modalWrap.find('#receiver-city');
        $citySelect.html(this.getSelectOption(cities));
        // 如果是地址更新，并且有城市信息，做城市的回填
        if (this.option.isUpdate && this.option.data.receiverCity) {
            $citySelect.val(this.option.data.receiverCity);
        }
    },
    // 获取收件人信息，并做表单验证
    getReceiverInfo: function() {
        var receiverInfo = {},
            result = {
                status: false,
                msg: ''
            };
        receiverInfo.receiverName = $.trim(this.$modalWrap.find('#receiver-name').val());
        receiverInfo.receiverProvince = this.$modalWrap.find('#receiver-province').val();
        receiverInfo.receiverCity = this.$modalWrap.find('#receiver-city').val();
        receiverInfo.receiverAddress = $.trim(this.$modalWrap.find('#receiver-address').val());
        receiverInfo.receiverPhone = $.trim(this.$modalWrap.find('#receiver-phone').val());
        receiverInfo.receiverZip = $.trim(this.$modalWrap.find('#receiver-zip').val());

        if (this.data.isUpdate) {
            receiverInfo.id = this.$modalWrap.find('#receiver-id').val();
        }
        // 表单字段验证
        if (!receiverInfo.receiverName) {
            result.msg = '请输入收件人姓名';
        } else if (!receiverInfo.receiverProvince) {
            result.msg = '请选择收件人所在省份';
        } else if (!receiverInfo.receiverCity) {
            result.msg = '请选择收件人所在城市';
        } else if (!receiverInfo.receiverAddress) {
            result.msg = '请输入收件人详细地址';
        } else if (!_util.validate(receiverInfo.receiverPhone, 'phone')) {
            result.msg = '请输入收件人手机号';
        } else {
            // 验证均通过
            result.status = true;
            result.data = receiverInfo;
        }
        return result;
    },
    // 获取select框的选项
    getSelectOption: function(optionArray) {
        var html = '<option value="">请选择</option>';
        for (var i = 0, len = optionArray.length; i < len; i++) {
            html += '<option value="' + optionArray[i] + '">' + optionArray[i] + '</option>'
        }
        return html;
    },
    // 关闭弹窗
    hide: function() {
        this.$modalWrap.empty();
    }
};

module.exports = addressModal;