/**
 * @Author: fuqi
 * @Date:   2018-01-26T10:42:14+08:00
 * @Email:  29984051@qq.com
 * @Project: mmall
 * @Filename: cart-service.js
 * @Last modified by:   fuqi
 * @Last modified time: 2018-02-22T22:41:41+08:00
 * @License: 123
 */
var _ph = require('util/phoock.js');

var _cart = {
    //更新商品的数量
    deleteProduct : function(productIds,resolve,reject){
        _ph.request({
            url:_ph.getServerUrl('/cart/delete_product.do'),
            data:productIds,
            success:resolve,
            error:reject
        })
    },
    //更新商品的数量
    updateProduct : function(param,resolve,reject){
        _ph.request({
            url:_ph.getServerUrl('/cart/update.do'),
            data:param,
            success:resolve,
            error:reject
        })
    },
    //选择所有商品
    selectAllProduct : function(resolve,reject){
        _ph.request({
            url:_ph.getServerUrl('/cart/select_all.do'),
            success:resolve,
            error:reject
        })
    },
    //取消选择所有商品
    unSelectAllProduct : function(resolve,reject){
        _ph.request({
            url:_ph.getServerUrl('/cart/un_select_all.do'),
            success:resolve,
            error:reject
        })
    },
    //选择商品
    selectProduct : function(productId,resolve,reject){
        _ph.request({
            url:_ph.getServerUrl('/cart/select.do'),
            data:{
                productId:productId
            },
            success:resolve,
            error:reject
        })
    },
    //取消选择商品
    unSelectProduct : function(productId,resolve,reject){
        _ph.request({
            url:_ph.getServerUrl('/cart/un_select.do'),
            data:{
                productId:productId
            },
            success:resolve,
            error:reject
        })
    },
    //获取购物车列表
    getCartList : function(resolve,reject){
        _ph.request({
            url:_ph.getServerUrl('/cart/list.do'),
            success:resolve,
            error:reject
        })
    },
    //加入购物车
    addCart : function(param,resolve,reject){
        _ph.request({
            url:_ph.getServerUrl('/cart/add.do'),
            data:param,
            success:resolve,
            error:reject
        })
    },
    //获取购物车数量
    getCartCount : function(resolve,reject){
        _ph.request({
            url:_ph.getServerUrl('/cart/get_cart_product_count.do'),
            success:resolve,
            error:reject
        })
    }
}

module.exports = _cart;
