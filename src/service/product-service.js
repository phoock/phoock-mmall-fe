/**
 * @Author: fuqi
 * @Date:   2018-02-20T21:14:28+08:00
 * @Email:  29984051@qq.com
 * @Project: mmall
 * @Filename: product-service.js
 * @Last modified by:   fuqi
 * @Last modified time: 2018-02-21T18:02:18+08:00
 * @License: 123
 */

 var _ph = require('util/phoock.js');

 var _product = {
     //获取商品详情
     getDetail : function(productId,resolve,reject){
         _ph.request({
             url:_ph.getServerUrl('/product/detail.do'),
             data:{
                 productId : productId
             },
             success:resolve,
             error:reject
         })
     },
     //获取商品列表
     productList : function(listParam,resolve,reject){
         _ph.request({
             url:_ph.getServerUrl('/product/list.do'),
             data:listParam,
             success:resolve,
             error:reject
         })
     }
 }

 module.exports = _product;
