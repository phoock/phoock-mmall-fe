var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
//获取html-webpack-plugin参数的犯法
var getHtmlPluginConfig = function(name,title) {
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        inject: true,
        hash: true,
        chunks: ['common', name],
        title:title
    }
}
var config = {
    entry: {
        'index': './src/page/index/index.js',
        'list': './src/page/list/index.js',
        'detail': './src/page/detail/index.js',
        'cart': './src/page/cart/index.js',
        'common': './src/page/common/index.js',
        'result': './src/page/result/index.js',
        'order-confirm': './src/page/order-confirm/index.js',
        'order-list': './src/page/order-list/index.js',
        'order-detail': './src/page/order-detail/index.js',
        'user-center': './src/page/user-center/index.js',
        'user-center-update': './src/page/user-center-update/index.js',
        'user-pass-update': './src/page/user-pass-update/index.js',
        'user-register': './src/page/user-register/index.js',
        'user-pass-reset': './src/page/user-pass-reset/index.js',
        'user-login': './src/page/user-login/index.js'
    },
    output: {
        path: __dirname + '/dist/',
        publicPath:'/dist/',
        filename: 'js/[name].js'
    },
    externals: {
        'jquery': 'window.jquery'
    },
    resolve:{
        alias : {
            node_modules:__dirname + '/node_modules',
            util:__dirname + '/src/util',
            page:__dirname + '/src/page',
            service:__dirname + '/src/service',
            images:__dirname + '/src/images'
        }
    },
    module : {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader"})
            },
            {
                test: /\.string$/,
                use: 'html-loader'
            },
            {
                test: /\.(gif|png|jpg|woff|woff2|svg|eot|ttf|otf)\??.*$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: '1024',
                            outputPath:'resource/',
                            publicPath:'../',
                            name:'[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        //独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({name: 'common', filename: 'js/base.js'}),

        //把css单独打包到文件,可以实现优先加载css文件,防止网页一开始的白屏
        new ExtractTextPlugin("css/[name].css"),

        //非常重要的html-webpack-plugin插件
        new HtmlWebpackPlugin(getHtmlPluginConfig('about','mmall电商平台')),
        new HtmlWebpackPlugin(getHtmlPluginConfig('index','mmall电商平台')),
        new HtmlWebpackPlugin(getHtmlPluginConfig('list','商品列表')),
        new HtmlWebpackPlugin(getHtmlPluginConfig('detail','商品详情')),
        new HtmlWebpackPlugin(getHtmlPluginConfig('cart','购物车')),
        new HtmlWebpackPlugin(getHtmlPluginConfig('order-confirm','订单确认页')),
        new HtmlWebpackPlugin(getHtmlPluginConfig('order-list','订单列表页')),
        new HtmlWebpackPlugin(getHtmlPluginConfig('order-detail','详情')),
        new HtmlWebpackPlugin(getHtmlPluginConfig('user-login','登录')),
        new HtmlWebpackPlugin(getHtmlPluginConfig('user-register','注册')),
        new HtmlWebpackPlugin(getHtmlPluginConfig('user-center','个人中心')),
        new HtmlWebpackPlugin(getHtmlPluginConfig('user-center-update','编辑个人中心')),
        new HtmlWebpackPlugin(getHtmlPluginConfig('user-pass-reset','找回密码')),
        new HtmlWebpackPlugin(getHtmlPluginConfig('user-pass-update','修改密码')),
        new HtmlWebpackPlugin(getHtmlPluginConfig('result','操作结果'))
    ]
}

module.exports = config
