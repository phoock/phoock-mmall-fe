/**
 * @Author: fuqi
 * @Date:   2018-02-21T10:45:00+08:00
 * @Email:  29984051@qq.com
 * @Project: mmall
 * @Filename: index.js
 * @Last modified by:   fuqi
 * @Last modified time: 2018-02-21T12:37:07+08:00
 * @License: 123
 */
'use strict';

require('./index.css');

var _ph = require('util/phoock.js');
var paginationTemplate = require('./template.string');

var Pagination = function(){
    var _this = this;
    //设置默认参数
    this.optionDefault = {
        container : null,
        pageNum : 1,
        pageRange : 3,
        onSelectPage : null
    }

    //绑定事件
    $('.pagination').on('click','.pg-item',function(){
        var $this = $(this);
        //判断onSelectPage是否为function
        if(!(typeof _this.option.onSelectPage === 'function')){
            return;
        }
        //判断$this是否为active或disable
        if($this.hasClass('active')||$this.hasClass('disable')){
            return
        }

        //验证通过,执行onSelectPage函数
        _this.option.onSelectPage($this.data('value'))
    })
}
Pagination.prototype.render = function(userOption){
    //合并参数
    this.option = $.extend({},this.optionDefault,userOption);

    //判断容器是否为合法的jQuery对象
    if(!(this.option.container instanceof jQuery)){
        return
    }
    //判断pages是否小于等于1
    if(this.option.pages<=1){
        return
    }
    //渲染分页
    this.option.container.html(this.getPaginationHtml());
}

Pagination.prototype.getPaginationHtml = function(){
    //设置参数
    var html = '',
        pageArray = [],
        option = this.option,
        start = option.pageNum - option.pageRange > 0
        ? option.pageNum - option.pageRange
        : 1,
        end = option.pageNum + option.pageRange < option.pages
        ? option.pageNum + option.pageRange
        : option.pages;

    //将分页元素用数据包装,放进数组pageArray中

    //上一页
    pageArray.push({
        name:'上一页',
        value:option.prePage,
        disable:!option.hasPreviousPage
    })

    //数字元素
    for(var i = start;i<=end;i++){
        pageArray.push({
            name:i,
            value:i,
            isActive : (i === option.pageNum)
        })
    }

    //下一页
    pageArray.push({
        name:'下一页',
        value:option.nextPage,
        disable:!option.hasNextPage
    })
    //渲染模板
    html = _ph.renderHtml(paginationTemplate,{
        pageArray : pageArray,
        pageNum : option.pageNum,
        pages : option.pages
    })
    return html;
}
module.exports = Pagination;
