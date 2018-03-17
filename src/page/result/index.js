/**
 * @Author: fuqi
 * @Date:   2018-01-27T21:09:36+08:00
 * @Email:  29984051@qq.com
 * @Project: mmall
 * @Filename: index.js
 * @Last modified by:   fuqi
 * @Last modified time: 2018-01-27T21:39:56+08:00
 * @License: 123
 */
require('./index.css')
require('page/common/nav-simple/index.js')
var _ph = require('util/phoock.js')

var result = {
    init:function(){

    }
}

$(function(){
     var type = _ph.getUrlParam('type') || 'default';
     var $element = $('.' + type + '-success');
     $element.show()
})
