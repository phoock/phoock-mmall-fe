/**
 * @Author: fuqi
 * @Date:   2018-01-27T13:24:41+08:00
 * @Email:  29984051@qq.com
 * @Project: mmall
 * @Filename: index.js
 * @Last modified by:   fuqi
 * @Last modified time: 2018-01-27T14:28:23+08:00
 * @License: 123
 */
 'use strict';
 var _ph = require('util/phoock.js');
 require('./index.css');

 var header = {
     init:function(){
         this.onLoad()
         this.bindEvent()
     },
     onLoad:function(){
        //关键字回填
        var keyWord = $.trim(_ph.getUrlParam('keyword'));
        if(keyWord){
            $('#search-input').val(keyWord);
        }
     },
     bindEvent:function(){
         var _this = this;
         //搜索按钮点击事件,input框的entry事件
         $('#search-btn').click(function(){
             _this.searchSubmit()
         })
         //绑定entry事件
         $('#search-input').keyup(function(e){
             if(e.keyCode === 13){
                 _this.searchSubmit()
             }
         })
     },
     //搜索提交
     searchSubmit:function(){
         var keyWord = $.trim($('#search-input').val());
         if(keyWord){
             window.location.href = './list.html?keyword=' + keyWord;
         }else{
             _ph.goHome()
         }
     }
 }

 header.init();
