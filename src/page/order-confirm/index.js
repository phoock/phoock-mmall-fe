/**
 * @Author: fuqi
 * @Date:   2018-02-23T09:31:50+08:00
 * @Email:  29984051@qq.com
 * @Project: mmall
 * @Filename: index.js
 * @Last modified by:   fuqi
 * @Last modified time: 2018-02-24T17:37:54+08:00
 * @License: 123
 */

'use strict';
require('page/common/header/index.js');
require('./index.css');
require('page/common/nav/index.js');

var _ph = require('util/phoock.js');
var _order = require('service/order-service.js');
var _address = require('service/address-service.js');
var addressTemplate = require('./address-list.string');
var productTemplate = require('./product-list.string');
var addressModal = require('./address-modal.js')


var orderConfirm = {
    data : {
        selectedAddressId:null
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    //页面加载部分
    onLoad : function(){
        this.loadAddress();
        this.loadProduct();
    },
    loadAddress : function(){
        var html = '',
            _this = this,
            $addressCon = $('.address-con');
        _address.getAddressList(function(res){
            //数据的处理,使其可以记录isActive信息
            _this.filter(res)

            html = _ph.renderHtml(addressTemplate,res);
            $addressCon.html(html);
        },function(errMsg){
            $addressCon.html('<p class="err-tip">地址加载失败,请刷新后重试</p>')
        })

    },
    loadProduct : function(){
        var html = '',
            $productCon = $('.product-con');
        _order.getProductList(function(res){
            html = _ph.renderHtml(productTemplate,res);
            $productCon.html(html);
        },function(errMsg){
            $productCon.html('<p class="err-tip">商品列表加载失败,请刷新后重试</p>')
        })
    },
    //事件绑定部分
    bindEvent : function(){
        var _this = this;
        //选择地址加active,缓存shippingId
        $('.address-con').on('click','.address-item',function(){
            var $this = $(this);
            //添加active
            $this.addClass('active').siblings('.address-item').removeClass('active')
            //缓存shippingid
            _this.data.selectedAddressId = $this.data('id');
        })
        //提交订单
        $('.product-con').on('click','.order-submit',function(){
            var $this = $(this);
            if(_this.data.selectedAddressId){
                _order.createOrder({
                    shippingId:_this.data.selectedAddressId
                },function(res){
                    window.location.href = './payment.html?orderNumber=' + res.orderNo;
                },function(errMsg){
                    _ph.errorTips(errMsg)
                })
            }else{
                _ph.errorTips('请选择一个收货地址,如果还没有收获地址,请创建一个收获地址')
            }
        })
        //添加收货地址
        $('.address-con').on('click','.address-add',function(){
            addressModal.show({
                isUpdate : false,
                onSuccess : function(){
                    _this.loadAddress();
                }
            })
        })

        //地址的编辑按钮
        $('.address-con').on('click','.address-edit',function(e){
            //停止冒泡
            e.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');
            _address.getSelectAddressInfo(shippingId,function(res){
                addressModal.show({
                    isUpdate : true,
                    shippingId : shippingId,
                    data:res,
                    onSuccess : function(res){
                        _this.loadAddress(res)
                    }
                })
            },function(errMsg){
                _ph.errorTips(errMsg);
            })

        });
        //地址的删除按钮
        $('.address-con').on('click','.address-delete',function(e){
            e.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');
            if(window.confirm('确定要删除该地址吗?')){
                _address.deleteAddress(shippingId,function(res){
                    _this.loadAddress();
                    //如果删除的项为选中状态,则清空selectedAddressId
                    (_this.data.selectedAddressId === shippingId) && (_this.data.selectedAddressId = null);
                },function(errMsg){
                    _ph.errorTips(errMsg);
                })

            }
        });
    },

    //共用函数封装
    filter : function(data){

        if(this.data.selectedAddressId){
            for(var i = 0,length = data.list.length;i<length;i++){
                if(data.list[i].id === this.data.selectedAddressId){
                    data.list[i].isActive = true;
                }
            }
        }
    }
}
$(function(){
    orderConfirm.init()
})
