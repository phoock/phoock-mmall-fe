/**
 * @Author: fuqi
 * @Date:   2018-01-25T15:12:09+08:00
 * @Email:  29984051@qq.com
 * @Project: mmall
 * @Filename: phoock.js
 * @Last modified by:   fuqi
 * @Last modified time: 2018-02-06T18:20:34+08:00
 * @License: 123
 */
var hogan = require('hogan.js');
var conf = {
    serverHost:''
}
var phoock = {
    //xhr请求
    request : function(param){
        var _this = this;
        $.ajax({
            url : param.url||'',
            dataType:param.type || '',
            method: param.method || 'GET',
            data: param.data || '',
            success: function(res){
                //请求成功
                if(res.status === 0){
                    typeof param.success === 'function' && param.success(res.data,res.msg)
                }
                //没有登录
                if(res.status === 10){
                    _this.doLogin()
                }
                //参数错误
                if(res.status === 1){
                    typeof param.error === 'function' && param.error(res.msg)
                }
            },
            error: function(errMsg){
                typeof param.error === 'function' && param.error(errMsg.statusText)
            }
        })
    },
    //获取服务器地址
    getServerUrl : function(path){
        return conf.serverHost + path;
    },
    //获取URL参数
    getUrlParam : function(name){
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result
            ?decodeURIComponent(result[2])
            :null;
    },
    //渲染html模板
    renderHtml : function(templateHtml,data){
        var template = hogan.compile(templateHtml);
        var result = template.render(data);
        return result;
    },
    //成功提示
    successTips : function(msg){
        window.alert(msg || '操作成功');
    },
    //失败提示
    errorTips : function(errMsg){
        window.alert(errMsg || '操作似乎出了点问题')
    },
    //字段的验证,支持非空验证,手机验证,邮箱验证
    validate: function(type,value){
        //require字段非空验证
        if('require'===type){
            return !!value
        }
        //手机验证
        if('phone'===type){
            return /^1\d{10}$/.test(value)
        }
        //邮箱验证
        if('email'===type){
            return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)
        }
    },
    //统一处理登录
    doLogin : function(){
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    //回到首页
    goHome : function(){
        window.location.href = './index.html'
    }
}

module.exports = phoock;
