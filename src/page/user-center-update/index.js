/**
 * @Author: fuqi
 * @Date:   2018-02-07T11:35:03+08:00
 * @Email:  29984051@qq.com
 * @Project: mmall
 * @Filename: index.js
 * @Last modified by:   fuqi
 * @Last modified time: 2018-02-07T16:04:35+08:00
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
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        //加载nav-side
        navSide.init({
            name:'user-center'
        })
        //加载用户信息
        this.loadUserInfo();
    },
    loadUserInfo: function(){
        var html = '';
        $('.pannel-body').html('<div class="loading"></div>');
        _user.getInformation(function(res){
            var html = _ph.renderHtml(templateIndex,res);
            $('.pannel-body').html(html)
        }, function(errMsg){
            _ph.errorTips(errMsg)
        })
    },
    bindEvent : function(){
        var _this = this;
        $('.page-wrap').on('click','.btn',function(){
            var formData = {
                phone : $.trim($('#phone').val()),
                email : $.trim($('#email').val()),
                question : $.trim($('#question').val()),
                answer : $.trim($('#answer').val())
            };
            var validateResult = _this.validate(formData);
            if(validateResult.status){
                _user.updateUserInfo(formData,function(res,msg){
                    _ph.successTips(msg);
                    window.location.href = './user-center.html';
                },function(errMsg){
                    _ph.errorTips(errMsg);
                })
            }else{
                _ph.errorTips(validateResult.msg);
            }
        })
    },
    validate : function(formData){
        var result = {
            status : false,
            msg : ''
        }
        //手机验证
        if(!_ph.validate('phone',formData.phone)){
            result.msg = '手机格式错误!'
            return result;
        }
        //邮箱验证
        if(!_ph.validate('email',formData.email)){
            result.msg = '电子邮箱格式错误!'
            return result;
        }
        //问题不能为空
        if(!_ph.validate('require',formData.question)){
            result.msg = '密码提示问题不能为空'
            return result;
        }
        //答案不能为空
        if(!_ph.validate('require',formData.answer)){
            result.msg = '密码提示问题的答案不能为空'
            return result;
        }
        //通过验证
        result.status = true;
        result.msg = '通过验证';
        return result;
    }
}

$(function(){
    userCenter.init()
})
