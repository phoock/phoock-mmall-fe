/**
 * @Author: fuqi
 * @Date:   2018-02-23T09:38:33+08:00
 * @Email:  29984051@qq.com
 * @Project: mmall
 * @Filename: order-service.js
 * @Last modified by:   fuqi
<<<<<<< HEAD
 * @Last modified time: 2018-02-25T10:21:40+08:00
======= * @Last modified time: 2018-02-25T10:21:40+08:00

>>>>>>> phoock-mmall-fe_v1.0
 * @License: 123
 */

 var _ph = require('util/phoock.js');

 var _order = {
     // 获取订单详情
     getOrderDetail : function(orderNo, resolve, reject){
         _ph.request({
             url     : _ph.getServerUrl('/order/detail.do'),
             data    : {
                 orderNo:orderNo
             },
             success : resolve,
             error   : reject
         });
     },
     // 取消订单
     cancelOrder : function(orderNo, resolve, reject){
         _ph.request({
             url     : _ph.getServerUrl('/order/cancel.do'),
             data    : {
                 orderNo:orderNo
             },
             success : resolve,
             error   : reject
         });
     },
     // 获取订单列表
     getOrderList : function(listParam, resolve, reject){
         _ph.request({
             url     : _ph.getServerUrl('/order/list.do'),
             data    : listParam,
             success : resolve,
             error   : reject
         });
     },
     //提交订单
     createOrder : function(orderInfo,resolve,reject){
         _ph.request({
             url:_ph.getServerUrl('/order/create.do'),
             data:orderInfo,
             success:resolve,
             error:reject
         })
     },
     //获取商品列表(用于order-confirm页面)
     getProductList : function(resolve,reject){
         _ph.request({
             url:_ph.getServerUrl('/order/get_order_cart_product.do'),
             success:resolve,
             error:reject
         })
     }
  }

 module.exports = _order;
