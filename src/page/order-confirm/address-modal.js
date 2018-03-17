/**
 * @Author: fuqi
 * @Date:   2018-02-23T21:51:08+08:00
 * @Email:  29984051@qq.com
 * @Project: mmall
 * @Filename: address-modal.js
 * @Last modified by:   fuqi
 * @Last modified time: 2018-02-24T17:30:48+08:00
 * @License: 123
 */

'use strict';
var _ph = require('util/phoock.js');
var _address = require('service/address-service.js');
var addressModalHtml = require('./address-modal.string');
var provinceCities = require('util/cities/index.js');

var addressModal = {
    init: function() {
        //缓存数据
        this.$modalWrap = $('.modal-wrap');
        return this;
    },
    show: function(option) {
        //缓存传入的数据
        this.option = option;
        this.option.data = option.data || {};
        //渲染页面
        this.loadModal()
        //绑定事件
        this.bindEvent()
    },

    //渲染Modal层
    loadModal: function() {
        var _this = this;
        //如果是更新操作则调用'根据shippingId获取一条地址的信息'接口
        var Html = _ph.renderHtml(addressModalHtml,{
            isUpdate    :  this.option.isUpdate,
            data        : this.option.data
        });
        this.$modalWrap.html(Html);
        //加载省份
        this.loadProvinces()
    },

    //加载省份
    loadProvinces : function(){
        //拿到省份数组
        var provinces = provinceCities.getProvinces();
        //将数据处理成html形式的字符串
        var optionHtml = this.getOptionHtml(provinces);
        //插入到指定元素
        var $receiverProvince = $('#receiver-province');
        $receiverProvince.html(optionHtml);

        //判断是否需要回填
        if(this.option.isUpdate&&this.option.data.receiverProvince){
            $receiverProvince.val(this.option.data.receiverProvince)
            this.loadCities(this.option.data.receiverProvince);
        };

    },
    loadCities : function(province){
        //拿到城市信息
        var cities = provinceCities.getCities(province) || [];
        //将数据处理成html形式的字符串
        var optionHtml = this.getOptionHtml(cities);
        //插入到指定元素
        var $receiverCity = $('#receiver-city');
        $receiverCity.html(optionHtml);

        //判断是否需要回填
        if(this.option.isUpdate&&this.option.data.receiverCity){
            $receiverCity.val(this.option.data.receiverCity)
        };

    },
    //将数组变成option元素字符串
    getOptionHtml:function(data){
        var html = '<option value="">请选择</option>';
        for(var i = 0,length = data.length;i<length;i++){
            html += '<option value="'+data[i]+'">'+data[i]+'</option>';
        }
        return html;
    },



    //事件绑定
    bindEvent: function(){
        var _this = this;

        //省市二级联动
        this.$modalWrap.on('change','#receiver-province',function(){
            //获取this.val传入loadCities
            _this.loadCities($(this).val());
        })

        //点击保存按钮
        $('.address-btn').click(function(){
            var receiverInfo = _this.getReceiverInfo(),
                isUpdate = _this.option.isUpdate;
            //通过了验证地址更新提交
            if(isUpdate && receiverInfo.status){
                    _address.updateAddress(receiverInfo.data, function(res){
                        _ph.successTips('地址修改成功');
                        typeof _this.option.onSuccess === 'function'
                            && _this.option.onSuccess(res);
                        _this.hide();
                    }, function(errMsg){
                        _ph.errorTips(errMsg);
                    });
                }
            //添加新地址
            else if(!isUpdate && receiverInfo.status){
                    _address.addNewAddress(receiverInfo.data, function(res){
                        _ph.successTips('地址添加成功');
                        _this.hide();
                        typeof _this.option.onSuccess === 'function'
                            && _this.option.onSuccess(res);
                    }, function(errMsg){
                        _ph.errorTips(errMsg);
                    });
                }
            else{
                _ph.errorTips(receiverInfo.errMsg)
            }
        });

        // this.$modalWrap.find('.address-btn').click(function(){
        //     var receiverInfo = _this.getReceiverInfo(),
        //         isUpdate     = _this.option.isUpdate;
        //     // 使用新地址，且验证通过
        //     if(!isUpdate && receiverInfo.status){
        //         _address.addNewAddress(receiverInfo.data, function(res){
        //             _ph.successTips('地址添加成功');
        //             _this.hide();
        //             typeof _this.option.onSuccess === 'function'
        //                 && _this.option.onSuccess(res);
        //         }, function(errMsg){
        //             _ph.errorTips(errMsg);
        //         });
        //     }
        //     // 更新收件人，并且验证通过
        //     else if(isUpdate && receiverInfo.status){
        //         _address.updateAddress(receiverInfo.data, function(res){
        //             _ph.successTips('地址修改成功');
        //
        //             typeof _this.option.onSuccess === 'function'
        //                 && _this.option.onSuccess(res);
        //             _this.hide();
        //         }, function(errMsg){
        //             _ph.errorTips(errMsg);
        //         });
        //     }
        //     else{
        //         _ph.errorTips(receiverInfo.errMsg || '好像哪里不对了~');
        //     }
        // })


        //点击遮罩层,x按钮清空modal
        this.$modalWrap.on('click','.modal-container',function(e){
            e.stopPropagation();
        })
        this.$modalWrap.on('click','.close',function(){
            _this.hide();
        })
    },
    getReceiverInfo:function(){
        //如果通过了数据验证则返回status:true,data:reciverInfo;
        //失败了则返回status:false,errMsg:XXXX
        var result = {
            status:false
        }
        var reciverInfo = {
            receiverName : $.trim($('#receiver-name').val()),
            receiverProvince : $.trim($('#receiver-province').val()),
            receiverCity : $.trim($('#receiver-city').val()),
            receiverAddress : $.trim($('#receiver-address').val()),
            receiverPhone : $.trim($('#receiver-phone').val()),
            receiverZip : $.trim($('#receiver-zip').val())
        }
        //如果是更新数据则需要添加shippingId字段
        if(this.option.isUpdate){

            reciverInfo.id = $.trim($('#receiver-id').val())
        }
        //数据验证 前面5个字段为必填
        if(!reciverInfo.receiverName){
            result.errMsg = '请输入收件人姓名';
        }else if (!reciverInfo.receiverProvince) {
            result.errMsg = '请选择省份信息';
        }else if (!reciverInfo.receiverCity) {
            result.errMsg = '请选择城市信息';
        }else if (!reciverInfo.receiverAddress) {
            result.errMsg = '请输入详细地址';
        }else if (!reciverInfo.receiverPhone) {
            result.errMsg = '请输入收件人手机号';
        }else if (reciverInfo.receiverPhone.length!==11) {
            result.errMsg = '请输入11位手机号';
        }else{
            result.status = true;
            result.data = reciverInfo;
        }

        return result;
    },
    hide: function() {
        this.$modalWrap.empty();
    }
}

module.exports = addressModal.init()
