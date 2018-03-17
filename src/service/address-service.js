/**
 * @Author: fuqi
 * @Date:   2018-02-23T15:18:30+08:00
 * @Email:  29984051@qq.com
 * @Project: mmall
 * @Filename: address-service.js
 * @Last modified by:   fuqi
 * @Last modified time: 2018-02-24T15:31:26+08:00
 * @License: 123
 */
 var _ph = require('util/phoock.js');

 var _address = {
     //更新一条地址信息
     updateAddress : function(reciverInfo,resolve,reject){
         _ph.request({
             url:_ph.getServerUrl('/shipping/update.do'),
             data:reciverInfo,
             success:resolve,
             error:reject
         })
     },
     //获取一条地址的信息
     getSelectAddressInfo : function(shippingId,resolve,reject){
         _ph.request({
             url:_ph.getServerUrl('/shipping/select.do'),
             data:{
                 shippingId:shippingId
             },
             success:resolve,
             error:reject
         })
     },
     //删除一条地址
     deleteAddress : function(shippingId,resolve,reject){
         _ph.request({
             url:_ph.getServerUrl('/shipping/del.do'),
             data:{
                 shippingId:shippingId
             },
             success:resolve,
             error:reject
         })
     },
     //添加新地址
     addNewAddress : function(reciverInfo,resolve,reject){
         _ph.request({
             url:_ph.getServerUrl('/shipping/add.do'),
             data:reciverInfo,
             success:resolve,
             error:reject
         })
     },
     //获取地址列表
     getAddressList : function(resolve,reject){
         _ph.request({
             url:_ph.getServerUrl('/shipping/list.do'),
             data:{
                 pageSize:20
             },
             success:resolve,
             error:reject
         })
     }
  }

 module.exports = _address;
