/**
 * @Author: fuqi
 * @Date:   2018-02-21T15:17:32+08:00
 * @Email:  29984051@qq.com
 * @Project: mmall
 * @Filename: index.js
 * @Last modified by:   fuqi
 * @Last modified time: 2018-02-21T21:01:01+08:00
 * @License: 123
 */
'use strict';
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.css')

var _ph = require('util/phoock.js');
var _product = require('service/product-service.js');
var _cart = require('service/cart-service.js');
var templateDetail = require('./detail.string')

var detail = {
    data:{
        productId:_ph.getUrlParam('productId') || ''
    },
    init:function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad:function(){
        //判断是否获取到了productId
        if(!this.data.productId){
            _ph.goHome();
        }
        this.loadDetail()
    },
    loadDetail:function(){
        var _this = this,
            html = '',
            $pageWrap = $('.page-wrap'),
            productId = this.data.productId;
        _product.getDetail(productId,function(res){
            //将res.subImages由字符串转换成为数组
            _this.filter(res);

            //缓存数据res
            _this.data.detailInfo = res;

            html = _ph.renderHtml(templateDetail,res);
            $pageWrap.html(html)
        },function(errMsg){
            $pageWrap.html('<p class="err-tips">这个商品很调皮找不着</p>')
        })
    },
    filter:function(data){
        data.subImages = data.subImages.split(',')
    },
    bindEvent:function(){
        var _this = this;
        //p-img的鼠标进入事件
        $('.page-wrap').on('mouseenter','.p-img',function(){
            var imageUrl = $(this).attr('src');
            $('.main-img').attr('src',imageUrl);
        })

        //p-count 加减事件
        $('.page-wrap').on('click','.p-count-btn',function(){
            var $this = $(this),
                type = $this.hasClass('plus')?'plus':'minus',
                $pCount = $('.p-count'),
                currentCount = parseInt($pCount.val()),
                maxCount = _this.data.detailInfo.stock,
                minCount = 1;
            //点+号按钮
            if(type === 'plus'){
                $pCount.val(currentCount < maxCount?currentCount+1:maxCount)
            }
            //点-号按钮
            if(type === 'minus'){
                $pCount.val(currentCount > minCount?currentCount - 1:1)
            }
        })

        //添加购物车
        $('.page-wrap').on('click','.add-cart',function(){
            var param = {
                productId:_this.data.productId,
                count:$('.p-count').val()
            }
            _cart.addCart(param,function(res){
                window.location.href = './result.html?type=cart-add';
            },function(errMsg){
                _ph.errorTips(errMsg);
            })
        })
    }

}
$(function(){
    detail.init()
})
