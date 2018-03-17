/**
 * @Author: fuqi
 * @Date:   2018-01-24T22:36:07+08:00
 * @Email:  29984051@qq.com
 * @Project: mmall
 * @Filename: index.js
 * @Last modified by:   fuqi
 * @Last modified time: 2018-02-06T15:27:59+08:00
 * @License: 123
 */

require('page/common/nav-simple/index.js')
require('./index.css')

var _ph = require('util/phoock.js');
var _user = require('service/user-service.js');



//页面逻辑
var login = {
    init : function(){
        this.bindEvent()
    },
    bindEvent : function(){
        var _this = this;
        //提交事件
        $('.btn-submit').click(function(){
            _this.submit();
        });
        $('.user-con').keyup(function(e){
            if(e.keyCode === 13){
                _this.submit();
            }
        })
    },
    submit : function(){
        var _this = this;
        //验证表单信息是否合法
        var formData = {
            username : $.trim($('#username').val()),
            password : $.trim($('#password').val())
        };
        var validateResult = this.validateForm(formData);
        if(validateResult.status){
            _user.login(formData,function(res){
                //登录成功
                window.location.href = _ph.getUrlParam('redirect') || './index.html';
            },function(errMsg){
                _this.errorItem.show(errMsg)
            })
        }else{
            _this.errorItem.show(validateResult.msg)
        }
    },
    validateForm : function(formData){
        var result = {
            status : false,
            msg : ''
        };
        if(!_ph.validate('require',formData.username)){
            result.msg = '用户名不能为空'
            return result;
        }
        if(!_ph.validate('require',formData.password)){
            result.msg = '密码不能为空';
            return result;
        }
        //验证通过
        result.status = true;
        result.msg = '验证通过';
        console.log(result);
        return result;
    },
    errorItem : {
        show : function(msg){
            $('.error-item').show().find('.err-msg').text(msg);
        },
        hide : function(){
            $('.error-item').hide().find('.err-msg').text('');
        }
    }
}

$(function(){
    login.init()
})
