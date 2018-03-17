/**
 * @Author: fuqi
 * @Date:   2018-02-06T20:11:26+08:00
 * @Email:  29984051@qq.com
 * @Project: mmall
 * @Filename: index.js
 * @Last modified by:   fuqi
 * @Last modified time: 2018-02-06T23:45:45+08:00
 * @License: 123
 */
require('page/common/nav-simple/index.js');
require('./index.css');

var _ph = require('util/phoock.js');
var _user = require('service/user-service.js');

var passReset = {
    data : {
        username:'',
        question:'',
        answer:'',
        token:''
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadStepUsername()
    },
    bindEvent : function(){
        var _this = this;
        $('.username-submit').click(function(e){
            e.preventDefault();
            var username = $.trim($('#username').val());
            if(username){
                _user.getQuestion(username,function(res){
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion()
                },function(errMsg){
                    _this.formError.show(errMsg)
                })
            }else{
                _this.formError.show('用户名不能为空!')
            }

        });

        $('.answer-submit').click(function(e){
            e.preventDefault();
            var answer = $.trim($('#answer').val());
            _this.data.answer = answer;
            if(answer){
                var data = {
                    username : _this.data.username,
                    question : _this.data.question,
                    answer : _this.data.answer,
                };
                _user.checkAnswer(data,function(res){
                    _this.data.token = res;
                    _this.loadStepPassword()
                },function(errMsg){
                    _this.formError.show(errMsg)
                })
            }else{
                _this.formError.show('答案不能为空!')
            }
        });
        $('.pass-submit').click(function(){
            var password = $.trim($('#password').val());
            if(password&&password.length>6){
                var data = {
                    username: _this.data.username,
                    passwordNew: password,
                    forgetToken: _this.data.token
                };
                _user.resetPassword(data,function(res){
                    window.location.href = './result.html?type=reset-password'
                },function(errMsg){
                    _this.formError.show(errMsg)
                })
            }else{
                _this.formError.show('密码不能为空!')
            }
        });

    },
    loadStepUsername : function(){
        $('.step-username').show()
    },
    loadStepQuestion : function(){
        this.formError.hide();
        $('.step-answer').show().siblings().hide();
        //显示密码提示问题
        $('.question').text(this.data.question);
    },
    loadStepPassword : function(){
        this.formError.hide();
        $('.step-password').show().siblings().hide();
    },
    formError : {
        show : function(msg){
            $('.error-item').show().find('.err-msg').text(msg)
        },
        hide : function(){
            $('.error-item').hide().find('.err-msg').text('')
        }
    }
}

$(function(){
    passReset.init()
})
