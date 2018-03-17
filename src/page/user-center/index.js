/**
 * @Author: fuqi
 * @Date:   2018-02-07T11:35:03+08:00
 * @Email:  29984051@qq.com
 * @Project: mmall
 * @Filename: index.js
 * @Last modified by:   fuqi
 * @Last modified time: 2018-02-24T21:38:19+08:00
 * @License: 123
 */
'use strict';
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.css')
var navSide = require('page/common/nav-side/index.js');
var _ph = require('util/phoock.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string')

var userCenter = {
    init:function(){
        this.onLoad()
    },
    onLoad : function(){
        //加载nav-side
        navSide.init({
            name:'user-center'
        })
        //加载用户信息
        this.loadUserInfo()
    },
    loadUserInfo: function(){
        var html = '';
        $('.panel-body').html('<div class="loading"></div>');
        _user.getInformation(function(res){
            var html = _ph.renderHtml(templateIndex,res);
            $('.panel-body').html(html)
        }, function(errMsg){
            _ph.errorTips(errMsg)
        })
    }
}

$(function(){
    userCenter.init()
})
