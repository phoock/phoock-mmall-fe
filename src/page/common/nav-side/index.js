/**
 * @Author: fuqi
 * @Date:   2018-01-27T15:07:31+08:00
 * @Email:  29984051@qq.com
 * @Project: mmall
 * @Filename: index.js
 * @Last modified by:   fuqi
<<<<<<< HEAD
 * @Last modified time: 2018-02-25T10:20:08+08:00
======= * @Last modified time: 2018-02-25T10:20:08+08:00

>>>>>>> phoock-mmall-fe_v1.0
 * @License: 123
 */
'use strict';

var _ph = require('util/phoock.js');
var template = require('./index.string')
require('./index.css')

var navSide = {
    option:{
        name:'',
        navList:[
            {name:'user-center',desc:'个人中心',href:'./user-center.html'},
            {name:'order-list',desc:'我的订单',href:'./order-list.html'},
            {name:'user-pass-update',desc:'修改密码',href:'./user-pass-update.html'},
            {name:'about',desc:'关于Mmall',href:'./about.html'}
        ]
    },

    init:function(options){
        var _this = this;
        $.extend(_this.option,options);

        for(var i = 0,length = _this.option.navList.length;i<length;i++){
            if(_this.option.navList[i].name == options.name){
                _this.option.navList[i].isActive = true
            }
        }
        this.renderNav()
    },
    renderNav:function(){
        var navSideHtml = _ph.renderHtml(template,{
            navList:this.option.navList
        })
        $('.nav-side').html(navSideHtml);
    }
}

module.exports = navSide;
