/**
 * @Author: fuqi
 * @Date:   2018-01-25T21:53:49+08:00
 * @Email:  29984051@qq.com
 * @Project: mmall
 * @Filename: user-service.js
 * @Last modified by:   fuqi
 * @Last modified time: 2018-02-07T17:56:49+08:00
 * @License: 123
 */
'use strict';

var _ph = require('util/phoock.js');

var _user = {
    //修改密码
    editPassword:function(userInfo,resolve,reject){
        _ph.request({
            url:_ph.getServerUrl('/user/reset_password.do'),
            data:userInfo,
            method:'POST',
            success:resolve,
            error:reject
        })
    },
    //更新个人信息
    updateUserInfo:function(userInfo,resolve,reject){
        _ph.request({
            url:_ph.getServerUrl('/user/update_information.do'),
            data:userInfo,
            method:'POST',
            success:resolve,
            error:reject
        })
    },
    //获取用户信息
    getInformation:function(resolve,reject){
        _ph.request({
            url:_ph.getServerUrl('/user/get_information.do'),
            method:'POST',
            success:resolve,
            error:reject
        })
    },
    //重置密码
    resetPassword:function(data,resolve,reject){
        _ph.request({
            url:_ph.getServerUrl('/user/forget_reset_password.do'),
            method:'POST',
            data:data,
            success:resolve,
            error:reject
        })
    },
    //检查密码提示问题答案
    checkAnswer:function(data,resolve,reject){
        _ph.request({
            url:_ph.getServerUrl('/user/forget_check_answer.do'),
            method:'POST',
            data:data,
            success:resolve,
            error:reject
        })
    },
    //获取密码提示问题
    getQuestion:function(username,resolve,reject){
        _ph.request({
            url:_ph.getServerUrl('/user/forget_get_question.do'),
            method:'POST',
            data:{
                username:username
            },
            success:resolve,
            error:reject
        })
    },
    //检查用户名是否存在
    checkUserName:function(username,resolve,reject){
        _ph.request({
            url:_ph.getServerUrl('/user/check_valid.do'),
            method:'POST',
            data:{
                type:'username',
                str:username
            },
            success:resolve,
            error:reject
        })
    },
    //检查登录状态
    checkLogin:function(resolve,reject){
        _ph.request({
            url:_ph.getServerUrl('/user/get_user_info.do'),
            method:'POST',
            success:resolve,
            error:reject
        })
    },
    //注册
    register:function(userInfo,resolve,reject){
        _ph.request({
            url:_ph.getServerUrl('/user/register.do'),
            method:'POST',
            data:userInfo,
            success:resolve,
            error:reject
        })
    },
    //登出
    logout:function(resolve,reject){
        _ph.request({
            url:_ph.getServerUrl('/user/logout.do'),
            method:'POST',
            success:resolve,
            error:reject
        })
    },
    //登录
    login : function(userInfo,resolve,reject){
        _ph.request({
            url : _ph.getServerUrl('/user/login.do'),
            method : 'POST',
            data : userInfo,
            success : resolve,
            error : reject
        })
    }
}
module.exports = _user;
