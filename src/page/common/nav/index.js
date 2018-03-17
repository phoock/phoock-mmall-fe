/**
 * @Author: fuqi
 * @Date:   2018-01-25T21:14:59+08:00
 * @Email:  29984051@qq.com
 * @Project: mmall
 * @Filename: index.js
 * @Last modified by:   fuqi
 * @Last modified time: 2018-02-22T17:35:56+08:00
 * @License: 123
 */
require('./index.css');

var _ph = require('util/phoock.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');

var nav = {
    init: function() {
        //加载登录状态
        this.loadUserInfo()
        //加载购物车数量
        this.loadCartCount()
        //绑定按钮
        this.bindEvent()
        return this;
    },

    loadUserInfo: function() {
        var _this = this;
        _user.checkLogin(function(res) {
            $('.not-login').hide().siblings('.has-login').show().find('.username').text(res.username || '未取名')
        }, function(errMsg) {
            //do nothing
        })
    },

    loadCartCount: function() {
        var _this = this;
        _cart.getCartCount(function(res) {
            $('.nav .cart-count').text(res || 0);
        }, function(errMsg) {
            $('.nav .cart-count').text(0);
        })
    },

    bindEvent: function() {
        var _this = this;
        //登录按钮
        $('.js-login').click(function(){
            _ph.doLogin()
        })
        //注册按钮
        $('.js-register').click(function(){
            window.location.href = './user-register.html';
        })
        //退出登录按钮
        $('.js-logout').click(function(){
            _user.logout(function(res){
                window.location.reload()
            },function(errMsg){
                _ph.errorTips(errMsg)
            })
        })
    }
}

module.exports = nav.init();
