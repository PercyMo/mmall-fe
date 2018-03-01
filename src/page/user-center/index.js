/*
 * @Author: PosyMo 
 * @Date: 2018-03-01 09:09:49 
 * @Last Modified by: PosyMo
 * @Last Modified time: 2018-03-01 16:49:48
 */
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');

var _util = require('util/util.js');

navSide.init({
    name: 'user-center'
});