/**
 * @Author: fuqi
 * @Date:   2018-02-20T17:46:44+08:00
 * @Email:  29984051@qq.com
 * @Project: mmall
 * @Filename: index.js
 * @Last modified by:   fuqi
 * @Last modified time: 2018-02-21T12:23:42+08:00
 * @License: 123
 */
'use strict';
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.css')

var _ph = require('util/phoock.js');
var templateList = require('./productList.string')
var _product = require('service/product-service.js');
var Pagination = require('util/pagination/index.js');

var list = {
    data: {
        listParam: {
            keyword: _ph.getUrlParam('keyword') || '',
            categoryId: _ph.getUrlParam('categoryId') || '',
            orderBy: _ph.getUrlParam('orderBy') || 'default',
            pageNum: _ph.getUrlParam('pageNumber') || 1,
            pageSize: _ph.getUrlParam('pageSize') || 5
        }
    },
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        this.loadList()
    },
    bindEvent: function() {
        var _this = this;
        $('.sort-item').click(function(){
            var $this = $(this);
            _this.data.listParam.pageNum = 1;
            //点击默认排序
            if($this.data('type')==='default'){
                //已经是active样式了
                if($this.hasClass('active')){
                    return;
                }else{
                    $this.addClass('active').siblings('.sort-item')
                    .removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default';
                }
            }
            //点击价格排序
            else if ($this.data('type') === 'price') {
                //active的处理
                $this.addClass('active').siblings('.sort-item')
                .removeClass('active asc desc')
                //升序,降序的处理
                if(!$this.hasClass('asc')){
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';//借口定义的
                }else{
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';
                }
            }
            //重新加载
            _this.loadList()
        })
    },
    loadList: function() {
        //申明变量
        var _this = this,
            listHtml = '',
            listParam = this.data.listParam,
            $pListCon = $('.p-list-con');
        $pListCon.html('<div class="loading"></div>');

        //删除参数中不必要的字段
        listParam.categoryId?
        (delete listParam.keyword)
        :(delete listParam.categoryId);
        //请求借口
        _product.productList(listParam,function(res){
            //查看接口信息
            console.log(res);
            //成功则渲染
            listHtml = _ph.renderHtml(templateList,{
                list:res.list
            });
            $('.p-list-con').html(listHtml)

            //渲染分页信息
            _this.loadPagination({
                hasNextPage:res.hasNextPage,
                nextPage:res.nextPage,
                hasPreviousPage:res.hasPreviousPage,
                prePage:res.prePage,
                pageNum:res.pageNum,
                pages:res.pages
            })
        },function(errMsg){
            _ph.errorTips(errMsg)
        })
    },
    //加载分页信息
    loadPagination : function(pageInfo){
        var _this = this;
        //创建pagination实例,有则不创建
        this.pagination?'':this.pagination = new Pagination()

        //调用render方法
        _this.pagination.render($.extend({},pageInfo,{
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadList();
            }
        }))
    }
}
$(function() {
    list.init()
})
