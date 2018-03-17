var RESTurl = {
    address: {
        '获取地址列表': {
            http: 'http://www.happymmall.com/shipping/list.do',
            require - param: 'pageSize(获取地址信息的上限)',
        },
        '根据shippingId获取一条地址的信息': {
            http: 'http://www.happymmall.com/shipping/select.do',
            require - param: 'shippingId(根据shippingId获取一条地址的信息)'
        },
        '添加新地址': {
            http: 'http://www.happymmall.com/shipping/add.do',
            require - param: {
                receiverName: '(姓名)',
                receiverProvince: '(省)',
                receiverCity: '(市)',
                receiverPhone: '(电话)',
                receiverAddress: '(地址)',
                receiverZip: '(邮编)'
            }
        },
        '更新地址': {
            http: 'http://www.happymmall.com/shipping/update.do',
            require - param: {
                receiverName: '(姓名)',
                receiverProvince: '(省)',
                receiverCity: '(市)',
                receiverPhone: '(电话)',
                receiverAddress: '(地址)',
                receiverZip: '(邮编)'
            }
        },
        '删除一条地址': {
            http: 'http://www.happymmall.com/shipping/del.do',
            require - param: 'shippingId(地址id)'
        }
    },

    cart: {
        '选择商品': {
            http: 'http://www.happymmall.com/cart/select.do',
            require - param: 'productId(通过商品id决定选中哪一个)'
        },
        '取消选择商品': {
            http: 'http://www.happymmall.com/cart/un_select.do',
            require - param: 'productId(通过商品id决定取消选择哪一个)'
        },
        '取消全选': {
            http: 'http://www.happymmall.com/cart/un_select_all.do',
            require - param: 'null'
        },
        '全选': {
            http: 'http://www.happymmall.com/cart/select_all.do',
            require - param: 'null'
        },
        '更新商品数量': {
            http: 'http://www.happymmall.com/cart/update.do',
            require - param: {
                productId: '(商品id)',
                count: '(商品数量)'
            }
        },
        '删除指定': {
            http: 'http://www.happymmall.com/cart/delete_product.do',
            require - param: 'productIds(可以多选,用逗号分隔)'
        },
        '获取购物车商品数量': {
            http: 'http://www.happymmall.com/cart/get_cart_product_count.do',
            require - param: 'null'
        },
        '获取购物车列表': {
            http: 'http://www.happymmall.com/cart/list.do',
            require - param: 'null'
        },
        '添加到购物车': {
            http: 'http://www.happymmall.com/cart/add.do',
            require - param: {
                productInfo:'(商品id)',
                count:'(商品数量)'
            }
        }
    },

    order: {
        '提交订单': {
            http: 'http://www.happymmall.com/order/create.do',
            require - param: 'shippingId(选择收货地址的id)'
        },
        '取消订单': {
            http: 'http://www.happymmall.com/order/cancel.do',
            require - param: 'orderNo(订单号)'
        },
        '获取订单列表': {
            http: 'http://www.happymmall.com/order/list .do',
            require - param: {
                pageNum: '(页码)',
                pageSize: '(每页数量)'
            }
        },
        '获取订单详情': {
            http: 'http://www.happymmall.com/order/detail.do',
            require - param: 'orderNo(订单号)'
        },
        '获取商品列表': {
            http: 'http://www.happymmall.com/order/get_order_cart_product.do',
            require - param: 'null'
        }
    },

    payment: {
        '获取支付信息': {
            http: 'http://www.happymmall.com/order/pay.do',
            require - param: 'orderNo(订单号)'
        },
        '获取订单状态': {
            http: 'http://www.happymmall.com/order/query_order_pay_status.do',
            require - param: 'orderNo(订单号)'
        }
    },

    product: {
        '获取商品列表': {
            http: 'http://www.happymmall.com/product/list.do',
            require - param: {
                keyword: _mm.getUrlParam('keyword') || '',
                categoryId: _mm.getUrlParam('categoryId') || '',
                orderBy: _mm.getUrlParam('orderBy') || 'default',
                pageNum: _mm.getUrlParam('pageNumber') || 1,
                pageSize: _mm.getUrlParam('pageSize') || 5
            }
        },
        '获取商品详细信息': {
            http: 'http://www.happymmall.com/product/detail.do',
            require - param: 'productId(商品号)'
        }
    },

    user: {
        '用户登录': {
            http: 'http://www.happymmall.com/user/login.do',
            require - param: {
                userInfo: {
                    username: '(用户名)',
                    password: '(密码)'
                }
            },
            method: 'POST'
        },
        '检查用户名': {
            http: 'http://www.happymmall.com/user/check_valid.do',
            require - param: {
                data: {
                    type: 'username', //表示检查的值类型为username
                    str: '(用户名)'
                }
            },
            method: 'POST'
        },
        '用户注册': {
            http: 'http://www.happymmall.com/user/register.do',
            require - param: {
                username: '(用户名)',
                password: '(密码)',
                passwordConfirm: '(密码确认)',
                phone: '(电话)',
                email: '(邮箱)',
                question: '(密码提示问题)',
                answer: '(密码提示问题的答案)'
            },
            method: 'POST'
        },
        '获取密码提示问题': {
            http: 'http://www.happymmall.com/user/forget_get_question.do',
            require - param: 'username(用户名)',
            method: 'POST'
        },
        '检查密码提示问题答案': {
            http: 'http://www.happymmall.com/user/forget_check_answer.do',
            require - param: {
                username: '(用户名)',
                question: '(密码提示问题)',
                answer: '(密码提示问题的答案)'
            },
            method: 'POST'
        },
        '重置密码': {
            http: 'http://www.happymmall.com/user/forget_reset_password.do',
            require - param: {
                username: '(用户名)',
                passwordNew: '(新密码)',
                forgetToken: '(forgetToken值)'
            },
            method: 'POST'
        },
        '更新个人信息': {
            http: 'http://www.happymmall.com/user/update_information.do',
            require - param: {
                phone: '(电话)',
                email: '(邮箱)',
                question: '(密码提示问题)',
                answer:'(问题答案)'
            },
            method: 'POST'
        },
        '检查登陆状态': {
            http: 'http://www.happymmall.com/user/get_user_info.do',
            require - param: null,
            method: 'POST'
        },
        '获取用户信息': {
            http: 'http://www.happymmall.com/user/get_information.do',
            require - param: null,
            method: 'POST'
        },
        '登出': {
            http: 'http://www.happymmall.com/user/logout.do',
            require - param: null,
            method: 'POST'
        },
        '登录状态下更新密码': {
            http: 'http://www.happymmall.com/user/reset_password.do',
            require - param: {
                passwordOld: '(旧密码)',
                passwordNew: '(新密码)'
            },
            method: 'POST'
        }

    }

}
