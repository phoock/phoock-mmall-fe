/**
 * @Author: fuqi
 * @Date:   2018-02-06T17:05:17+08:00
 * @Email:  29984051@qq.com
 * @Project: mmall
 * @Filename: index.js
 * @Last modified by:   fuqi
 * @Last modified time: 2018-02-07T15:43:56+08:00
 * @License: 123
 */
'use strict';
require('page/common/nav-simple/index.js');
require('./index.css');

var _ph = require('util/phoock.js');
var _user = require('service/user-service.js');

var register = {
    init : function(){
        this.bindEvent()
    },
    bindEvent : function(){
        var _this = this;
        //username后台验证
        $('#username').blur(function(){
            var username = $.trim($(this).val());
            if(!username){
                return;
            }
            //异步验证用户名是否存在
            _user.checkUserName(username,function(res){
                _this.formError.hide()
            },function(errMsg){
                _this.formError.show(errMsg)
            })
        })

        //点击提交事件
        $('.btn-submit').click(function(){
            _this.submit();
        })
        $('.user-con').keyup(function(e){
            if(e.keyCode === 13){
                _this.submit();
            }
        })
    },
    submit : function(){
        var _this = this;
        var formData = {
            username : $.trim($('#username').val()),
            password : $.trim($('#password').val()),
            passwordConfirm : $.trim($('#password-confirm').val()),
            phone : $.trim($('#phone').val()),
            email : $.trim($('#email').val()),
            question : $.trim($('#question').val()),
            answer : $.trim($('#answer').val())
        };
        var validateResult = _this.validate(formData);
        if(validateResult.status){
            _user.register(formData,function(res){
                window.location.href = './result.html?type=register';
            },function(errMsg){
                _this.formError.show(errMsg)
            })
        }else{
            _this.formError.show(validateResult.msg)
        }
    },

    validate : function(formData){
        var result = {
            status : false,
            msg : ''
        }
        //用户名不能为空
        if(!_ph.validate('require',formData.username)){
            result.msg = '用户名不能为空';
            return result;
        }
        //密码长度不能小于6
        if(formData.password.length<6){
            result.msg = '密码长度不能小于6';
            return result;
        }
        //password-confirm  不等于 password
        if(formData.password !== formData.passwordConfirm){
            result.msg = '密码确认不能为空或两次输入的密码不一样';
            return result;
        }
        //手机验证
        if(!_ph.validate('phone',formData.phone)){
            result.msg = '手机不能为空或您的手机格式不正确';
            return result;
        }
        //邮箱验证
        if(!_ph.validate('email',formData.email)){
            result.msg = '邮箱不能为空或您的邮箱格式不正确';
            return result;
        }
        //密码提示问题不能为空
        if(!_ph.validate('require',formData.question)){
            result.msg = '密码提示问题不能为空';
            return result;
        }
        //密码提示问题答案不能为空
        if(!_ph.validate('require',formData.answer)){
            console.log(formData);
            result.msg = '密码提示问题答案不能为空';
            return result;
        }

        //通过验证
        result.status = true;
        result.msg = '通过验证';
        return result;
    },

    //错误提示
    formError : {
        show : function(msg){
            $('.error-item').show().find('.err-msg').text(msg)
        },
        hide :function(){
            $('.error-item').hide().find('.err-msg').text('')
        }
    }
}
$(function(){
    register.init();
})
