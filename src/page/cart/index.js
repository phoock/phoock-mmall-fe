/**
 * @Author: fuqi
 * @Date:   2018-02-22T11:58:05+08:00
 * @Email:  29984051@qq.com
 * @Project: mmall
 * @Filename: index.js
 * @Last modified by:   fuqi
 * @Last modified time: 2018-02-22T22:53:41+08:00
 * @License: 123
 */

'use strict';
require('page/common/header/index.js');
require('./index.css');

var nav = require('page/common/nav/index.js');
var _ph = require('util/phoock.js');
var _cart = require('service/cart-service.js');
var cartTemplate = require('./cart.string');

var cart = {
    //缓存的数据
    data:{

    },
    init : function(){
        //加载页面
        this.onLoad();
        //绑定事件
        this.bindEvent();
    },
    onLoad : function(){
        //加载购物车
        this.loadCart();
    },
    bindEvent : function(){
        var _this = this;
        //select-Checkbox方法
        $('.page-wrap').on('click','.cart-select',function(){
            var $this = $(this),
                productId =$this.parents('.cart-table').data('product-id');
            //已经选中,调用选中接口
            if($this.is(':checked')){
                _cart.selectProduct(productId,function(res){
                    _this.renderCart(res)
                },function(errMsg){
                    _this.showCartError()
                })
            }
            //未选中,调用未选中接口
            else{
                _cart.unSelectProduct(productId,function(res){
                    _this.renderCart(res)
                },function(errMsg){
                    _this.showCartError()
                })
            }
        })
        //selectAll-Checkbox方法
        $('.page-wrap').on('click','.cart-select-all',function(){
            var $this = $(this);

            //已经选中,调用选中接口
            if($this.is(':checked')){
                _cart.selectAllProduct(function(res){
                    _this.renderCart(res)
                },function(errMsg){
                    _this.showCartError()
                })
            }
            //未选中,调用未选中接口
            else{
                _cart.unSelectAllProduct(function(res){
                    _this.renderCart(res)
                },function(errMsg){
                    _this.showCartError()
                })
            }
        });

        //cell-count点击事件
        $('.page-wrap').on('click','.count-btn',function(){
            //定义变量
            var $this = $(this),
                type = $this.hasClass('plus')?'plus':'minus',
                $countInput = $this.siblings('.count-input'),
                productId = $this.parents('.cart-table').data('product-id'),
                currentVal = parseInt($countInput.val()),
                minVal = 1,
                maxVal = $this.parents('.cell-count').data('max-count'),
                newVal = 0;
            //如果是+号
            if(type==='plus'){
                if(currentVal>=maxVal) {
                    _ph.errorTips('该商品已达最上限')
                    return;
                }
                newVal = currentVal + 1;
            }else{
                if(currentVal<=minVal){
                    return
                }
                newVal = currentVal - 1;
            }

            //拿到数据以后做渲染
            _cart.updateProduct({
                productId:productId,
                count:newVal
            },function(res){
                _this.renderCart(res)
            },function(errMsg){
                _this.showCartError()
            })
        });

        //单个商品的删除
        $('.page-wrap').on('click','.cart-delete',function(){

            var $this = $(this),
                productIds = $this.parents('.cart-table').data('product-id');
            if(window.confirm('确定要删除吗?')){
                _this.deleteProduct(productIds);
            }
        });

        //删除选中商品
        $('.page-wrap').on('click','.delete-selected',function(){

            var productIds = [],

                $cartSelect = $('.cart-select');

            //将含有checked的select的productid push进productids数组
            for(var i = 0,length = $cartSelect.length;i<length;i++){
                if($($cartSelect[i]).is(':checked')){
                    productIds.push($($cartSelect[i]).parents('.cart-table').data('product-id'));
                }
            }
            //如果productIds有值则调用删除函数
            if(productIds.length){
                if(window.confirm('确定要删除吗?')){
                    _this.deleteProduct(productIds.join(','))
                }
            }else{
                _ph.errorTips('您还没有选择商品!')
            }
        });

        //去结算
        $('.page-wrap').on('click','.btn-submit',function(){
            //总价大于0,并且价钱大于0
            if(_this.data.currentData.cartProductVoList&&_this.data.currentData.cartTotalPrice>0){
                window.location.href = './order-confirm.html';
            }else{
                _ph.errorTips('请选择商品后再提交');
            }
        })
    },
    loadCart : function(){
        var _this       = this;
        // 获取购物车列表
        _cart.getCartList(function(res){
            _this.renderCart(res);
        }, function(errMsg){
            _this.showCartError();
        })
    },

    //加入notEmpty字段
    filter : function(data){
        data.notEmpty = !!data.cartProductVoList.length;
    },

    //封装删除操作
    deleteProduct : function(productIds){
        var _this = this;
        _cart.deleteProduct({
            productIds:productIds
        },function(res){
            _this.renderCart(res)
        },function(errMsg){
            _this.showCartError()
        })
    },

    //渲染cart
    renderCart : function(data){
        var html = '';
        //加工data数据
        this.filter(data);
        //缓存数据
        this.data.currentData = data;
        //渲染模板,并插入到html中
        html = _ph.renderHtml(cartTemplate,data);
        $('.page-wrap').html(html);

        //更新nav右上角cart-count
        nav.loadCartCount();
    },
    showCartError: function(){
        $('.page-wrap').html('<p class="err-tip">哪里不对了，刷新下试试吧。</p>');
    }
}
$(function(){
    cart.init()
})
