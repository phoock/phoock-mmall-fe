/**
 * @Author: fuqi
 * @Date:   2018-02-07T11:35:03+08:00
 * @Email:  29984051@qq.com
 * @Project: mmall
 * @Filename: index.js
 * @Last modified by:   fuqi
 * @Last modified time: 2018-02-20T09:43:25+08:00
 * @License: 123
 */
'use strict';
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.css')
var navSide = require('page/common/nav-side/index.js');
var _ph = require('util/phoock.js');
var _user = require('service/user-service.js');


var userCenter = {
    init:function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        //加载nav-side
        navSide.init({
            name:'user-pass-update'
        })
    },
    bindEvent : function(){
        var _this = this;
        $('.page-wrap').on('click','.btn',function(){
            var formData = {
                passwordOld : $.trim($('#passwordOld').val()),
                passwordNew : $.trim($('#passwordNew').val()),
                passwordConfirm : $.trim($('#passwordConfirm').val())
            };
            var validateResult = _this.validate(formData);
            if(validateResult.status){
                _user.editPassword({
                    passwordOld : formData.passwordOld,
                    passwordNew : formData.passwordNew
                },function(res,msg){
                    _ph.successTips(msg);
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
        console.log(formData);
        //原密码不能为空
        if(!_ph.validate('require',formData.passwordOld)){
            result.msg = '原密码不能为空!'
            return result;
        }
        //新密码不能为空且长度不能小于6
        if(!_ph.validate('require',formData.passwordNew)||formData.passwordNew.length<6){
            result.msg = '新密码不能为空并且长度不能小于6!'
            return result;
        }
        //密码确认不等于新密码
        if(formData.passwordNew!==formData.passwordConfirm){
            result.msg = '确认密码不等于新密码,请重新输入'
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
