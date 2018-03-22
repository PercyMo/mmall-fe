/*
 * @Author: PosyMo 
 * @Date: 2018-03-22 11:49:26 
 * @Last Modified by: PosyMo
 * @Last Modified time: 2018-03-22 19:27:36
 */
'use strict';
var _util = require('util/util.js');
var _cities = require('util/cities/index.js');
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
    },
    loadCities: function(provinceName) {
        var cities = _cities.getCities(provinceName) || [],
            $citySelect = this.$modalWrap.find('#receiver-city');
        $citySelect.html(this.getSelectOption(cities));
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