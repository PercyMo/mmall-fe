/*
* @Author: PosyMo
* @Date:   2018-01-31 19:43:28
* @Last Modified by:   PosyMo
* @Last Modified time: 2018-02-08 14:33:33
*/
'use strict';

console.log('hello index');
require('./index.css');
require('../module.js');

var $$ = require('jquery');
$$('body').html('hello jquery ~~~~~~~');