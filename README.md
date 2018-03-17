@Author: fuqi
@Date:   2018-02-22T11:32:15+08:00
@Email:  29984051@qq.com
@Project: mmall
@Filename: 开发思路.txt
@Last modified by:   fuqi
@Last modified time: 2018-02-22T11:32:27+08:00
@License: 123
# `phoock-mmall电商平台`

- 在学习完慕课网上由Rosen老师录制的电商平台课程以后,我将重新把代码做一遍,梳理一下思路,巩固和提高自己的业务水平.
- 该项目所用到的接口我已整理在了`接口信息.js`文件中,由Rosen老师开发.
- 该项目为前端电商平台的`练习项目`.

- 我会将开发日志,记录在此`readme`文件中

### 查看本项目需要准备

    由于后端接口为真实数据,所以本例子使用了Charles作为HTTP代理服务器.
    Map Remote Settings:
    from http://localhost:8080/user/* to http://www.happymmall.com/user/
    from http://localhost:8080/cart/* to http://www.happymmall.com/cart/
    from http://localhost:8080/product/* to http://www.happymmall.com/product/
    from http://localhost:8080/order/* to http://www.happymmall.com/order/
    from http://localhost:8080/shipping/* to http://www.happymmall.com/shipping/
***

### 项目日志

### 2018/1/24


    1. 建立项目目录
        mkdir src,cd src,mdkir view,mdkir page,mdkir service,mdkir util,mdkir images.

    2. 整理项目所需要的图片
        在images目录下将准备好的banner文件,floor文件,icon文件.

    3. 整理项目页面的设计参考图
        将成品网站各个页面截图并放在design文件内,方便将来写css作为参考样式.

    4. 整理项目需要的接口地址
        项目需要的所有接口文件统一整理到`接口信息.js`这个文件内.

    5. git创建
        创建git项目,clone到本地,初始化npm填写相应信息.

    6. 配置webpack.config.js
        - enrty
        - output : path属性路径决定了filename的根目录地址,一切插件的filename属性也都参照该地址作为根目录地址.
        - externals : {'jquery':'window.jQuery'}用于加载外部cdn链接.
        - plugin
            wepack.optimize.CommonsChunkPlugin<br/>
                提取chunk里的公共部分,同时也能创建全局文件,提升效率
            extract-text-webpack-plugin
                它会将所有的入口 chunk(entry chunks)中引用的 .css，移动到独立分离的 CSS 文件.
                使用方法有点特别,直接参考文档.
        - module
            css-loader style-loader



***

### 2018/1/25
    1. 创建view文件夹下的index.html进行测试
        引入外部jquery文件
        同时引入base.js进行通用模块测试

    2. 用html-webpack-plugin来处理html文件
        该插件能自动生成一份html文件,并将页面引用的js,css文件自动插入到该html文件中,本项目中能用到的配置属性有:
            - title:'html对应的title属性',
            - filename:'最终生成的html文件名称',
            - template:'handlebars!src/index.hbs',
                意思是'以handlebars来解析路径为src/index.hbs文件',如果不指定loader的话，默认使用 `ejs-loader`
            - inject: 'true',
                1. true或者body：所有JavaScript资源插入到body元素的底部
                2. head: 所有JavaScript资源插入到head元素中
                3. false： 所有静态资源css和JavaScript都不会注入到模板文件中
            - hash: 'true|false'，是否为所有注入的静态资源添加webpack每次编译产生的唯一hash值,
            - chunks:'common',
                允许插入到模板中的一些chunk，不配置此项默认会将entry中所有的thunk注入到模板中.
                在本项目中使用['common',name]也就是每个页面插入2个js文件,分别是自身的js文件和common.js通用文件

    3. 在使用ejs语法引用其他html文件时需要有html-loader,所以下载html-loader
        在模板文件里直接使用<%= require('html-loader!./layout/common.html')%>, 也可以在webpack.config.js里加.

    4. 使用url-loader:以前版本url-loader封装了file-loader,新版本请把file-loader也下载了.
        如果图片较多，会发很多http请求，会降低页面性能。
        这个问题可以通过url-loader解决。url-loader会将引入的图片编码，生成dataURl
        如果图片较大，编码会消耗性能。因此url-loader提供了一个limit参数，小于limit字节的文件会被转为DataURl，
        大于limit的还会使用file-loader进行copy。
            配置url-loader
            test: /\.jpeg$/, (不限于jpeg文件)
            use: 'url-loader?limit=1024&name=[path][name].[ext]&outputPath=resource/&publicPath=../',

            //上面这种写法与下面的等价
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: '1024', //url-loader的属性,阈值为1024byte
                        outputPath:'resource/', //输出的路径(相对于output.path属性)
                        publicPath:'../', //引用文件前面加的路径,根据情况不同做出调整
                        name:'[name].[ext]' //输出的文件名
                    }
                }
            ]

    5. webpack.config.js里配置resolve.alias属性,方便引入路径时使用
        alias:{
            util:`__dirname` + '/src/util',
        }

    6. 下载webpack-dev-server:不要忘记在output中添加pubilcPath,使引用的js文件能正确加载

    ***

##### 以上就把配置文件基本搞定,接下来开始业务逻辑的编写.
    1. util/phoock.js(封装通用工具)
        - request //网络请求
        - getServerUrl //获取服务器地址
        - getUrlParam //获取URL参数,注意从url中取出参数后用`decodeURIComponent`解码
        - renderHtml //渲染html模板
        - successTips //成功提示
        - errorTips //失败提示
        - validate //字段的验证，支持非空、手机、邮箱的判断
        - doLogin //统一登陆处理,注意跳转链接时用`encodeURIComponent`编码
        - goHome //回到首页

    2. 在view/layout文件夹下创建公共html文件
        - head-common.html 放meta标签文件
        - footer.html 放footer部分的html文件,把jquery引用的cdn链接也放在此文件中

    3. page/common/layout里补全通用样式通用样式
        - * ,body,li,img,label,input
        - 定宽样式
        - hide,link,linktext,btn,btn-mini,loading
        - 在common/index.js里引入font-awesome字体图标库

    4. nav-simple模块
        - html部分:包含一个logo

    5. nav模块
        - html部分:左侧user(注册登录),右侧list购物车,我的订单,个人中心,关于本站等按钮.
        - js部分:加载用户信息(登录状态),购物车数量,每个按钮绑定click事件.


***
### 2018/1/27
    1. footer模块
        - html部分:静态链接+jquery模块加载

    2. header模块
        - html部分:logo+search框+提交按钮.
        - css部分:absolute不指定left,top时,默认以上一个元素的末尾为起始.(这种方式可以解决内联元素`回车导致的间隙`)
        - js部分:
            根据Url回填search框里的内容
            点击提交按钮,提交搜索操作(获取参数时用一下$.trim删除空格),也绑定回车键(keyCode === 13)
    3. nav-side模块
        - html部分:在入口html模板文件,创建page-wrap类以及下面的with-nav类.
        - css部分:左区130px宽,右区950px宽.左侧菜单是渲染出来的,所以要定min-hight使其变成一个区域,
        防止加载时短暂的坍塌
        - js部分:渲染nav-side部分,自建数据对象option,用option.navList作为数据渲染模板文件.
            其他页面通过引入navSide对象,navSide({name:'user-center'})来使用该模块

    4. result页面
        - html部分:成功提示+后续操作按钮
        - js部分:根据url传的type参数来显示不同的html代码

***

### 2018/1/29
##### 用户模块的开发
- 页面分析:登录,注册,找回密码,个人中心,修改密码
    1. 用户登录页面
        - html部分:nav-simple,title,账号密码,注册按钮,忘记密码按钮.
        - css部分:错误提示框颜色#fde9e9
        - js部分:
            - 点击登录按钮,前端表单验证formValidate
            - 通过了前端验证以后,调用login接口做后端验证,
            - 成功以后跳转链接,如果有参数redirect则跳转至该值,否则跳转至index.html

***
### 2018/2/6
##### 用户模块的开发
    1. 完成因事耽搁的用户登录页面的js部分
    2. 用户注册页面
        - html部分:用户名,密码,再次输入密码,手机号,邮箱,密码提示问题,提示问题答案
        - css部分:参考login页面
        - js部分:
            - blur事件,鼠标移开input框时触发,做ajax验证(checkUserName)用户名是否存在
            - 合法性验证:1,用户名是否为空.2,密码是否为空.3,验证密码长度
            4,两次输入的密码是否一致.5,验证手机号.6,验证邮箱.7,密码提示问题及答案不能为空
            - 注册成功跳转至result页面
    3. 找回密码页user-pass-reset_password
        - html部分:输入用户名(下一步),显示密码提示问题,输入提示问题答案(下一步),输入新密码
        - css部分:背景颜色改淡一点,三个步骤都隐藏掉
        - js部分:
            - onload方法加载第一步,loadStepUsername
            - 通过获取密码提示问题接口将问题保存在data中,同时加载第二步loadStepQuestion
            - 通过检查密码提示问题答案接口获取token值,并加载第三步loadStepPassword
            - 调用重置密码接口,完成密码的重置

***

### 2018/2/7
##### 用户模块的开发
    1. 个人中心页面(user-center)
        - html部分:加载nav-side,page-wrap同级添加面包屑导航crumb,并在右侧区域添加panel>panel-title&panel-body
        - css部分:面包屑导航的css可以放在header下,panel的css放在layout下
        - js部分:本页的逻辑即加载用户信息
            - 通过接口获取用户个人信息,作为数据
            - 创建index.string文件作为html模板进行渲染
            - 用html-loader来解析.string$文件

    2. 个人中心编辑页面(user-center-update)
        - html部分:和user-center基本一样,只不过将span元素变成input元素
        - css部分:input不继承上层样式,所以这里需要重新写input元素的样式
        - js部分:加载基本信息,并且绑定提交按钮
            - 这里的元素都是js生成的,所以需要用`事件代理`来绑定click事件
            - click以后首先获取表单信息,再做表单验证,验证通过以后调用接口

    3. 修改密码页面(user-pass-update)
        - html部分:和user-center基本一样,原密码,新密码,确认密码
        - css部分:
        - js部分:没有onLoad,绑定提交按钮(同样也是事件代理),注意表单验证

***

### 2018/2/20
##### 商品模块的设计和功能拆分
    1. 网站首页功能点
        - 推荐搜索关键字的快捷链接
        - 活动展示的轮播图
        - 分楼层的商品分类信息
    2. 商品列表页功能点
        - 商品列表的展示
        - 排序的逻辑
        - 分页的处理
        - 需要用到:商品list接口
    3. 商品详情页功能点
        - 商品信息展示
        - 缩略图预览
        - 添加购物车
        - 商品详情接口,添加购物车接口
##### 商品模块的页面开发
    1. 网站首页开发
        - 左侧关键字导航界面开发
        - html部分:
            左侧菜单:ul.keywords-list>(li.keywords-item>a*2)
            右侧banner容器:banner-con
        - css部分:
             左侧菜单width:240px;height:350px;padding:10px 0;margin-right:10px;
        - F楼层界面开发
        - html部分:
            新的w容器>floor-wrap>floor-title+(floor-list>li>a>(span+img))

        - banner轮播开发
            使用的是一个停更的插件jquery unslider,下载链接已经失效,需要自己保存源代码
            https://github.com/idiot/unslider这个是未失效的插件地址
    2. 商品列表页面开发
        html部分:
            - 排序容器(sort-con),商品列表容器(p-list-con),分页容器(pagination)
            - fa-sort-asc fa-sort-desc
        css部分:
            - 排序按钮,
        js部分:
            - 在onload事件中,通过keyword或categoryId调用list接口拿回数据,再用数据渲染html魔板
            - 在bindEvent中,调用排序接口,并通过改变css类名来控制显示

### 2018/2/21
##### 分页模块的开发
    - 建造一个类的形式,用于反复使用该模块
    1. 在list.js中模拟使用new Pagination()
        this.pagination?'':this.pagination = new Pagination()
    2. 根据接口设计传入参数
        hasPreviousPage
        prePage
        hasNextPage
        nextPage
        pageNum
        pages
    3. 创建Pagination默认属性defaultOption,设计默认属性为container,pageNum,pageRange,onSelectPage
    4. 创建公有render方法
        - 合并默认属性和userOption
        - 判断容器是否为合法的jQuery对象
        - 判断分页只有一页,就没必要显示了
        - 都通过以后就可以渲染分页了,this.optioin.container.html(this.getPaginationHtml())
    5. 创建getPaginationHtml公有方法(渲染方法)
        |上一页| 1 2 =3= 4 5 |下一页| 3/5
        - 将这些元素用数据形式包装起来,设计对象{name:显示,value:点击以后,disable:是否可点击,isActive:是否选中}
        - 通过这个数据将pagination渲染出来
        - 上一页 数字按钮(从start到end的for循环) 下一页 当前/总数
    6. 创建string文件,注意将value值保存在元素节点data-value里,方便以后取出
    7. 写pagination的css部分
    8. 在list页面传参部分,传入回调函数onSelectPage,更改list页面中pageNum值,然后调用loadList(),
    重新加载list页面实现点击翻页的效果
    9. 回到pagination的init方法中,绑定.pg-item的点击事件
        - 判断点击是否有效,(disable||active) return
        - typeof this.option.onSelectPage === 'function' 取出data('value')

##### detail详情页开发
    - 通过url拿到productId,调用接口将商品的信息渲染出来.同时有添加购物车的按钮,和选择商品数量的按钮.
    1. 基本结构类似于list页面,缓存数据data:{productId : xxx}
    2. 首先判断页面是否拿到了productId这个数据,如果没有则错误处理(直接就gohome,返回首页)
    3. html 结构: {
        intro-wrap:{
            p-img-con:{
                main-img-con>main-img,
                p-img-list>(p-img-item>p-img) x 5
            },
            p-intro-con:{
                p-name,
                p-subtitle,
                p-info-item>label,p-price 价格
                p-info-item>label,p-info 库存
                p-info-item>label,p-count 数量 plus minus
                p-info-item>btn,cart-add 加入购物车
            }
        },
        detail-wrap:{
            detail-tab-con:{
                detail-tab-list>detail-tab-item
            },
            detail-content-con{
                {{{detail}}}
            }
        }
    }
    4. css样式跟着图片写就ok了,user-select:none;这个样式可以防止点击的时候选中文字(需要加兼容前缀)
    5. 页面的渲染,其中接口返回数据需要处理一下,添加filter函数,修改引用类型时要理解其原理
        - hogan里索引式的数组{{.}}表示当前循环下的索引值
    6. 鼠标进入mouseenter,切换main-img事件,这里使用$.attr
    7. p-count 加号,减号 click事件.
    8. 添加购物车事件,成功后跳转到result页面
    9. 完善result页面的type

### 2018/2/21
##### 购物车模块的开发
    1. html构建思路:{
        cart-header:{
            cart-table>tr>th{
                cell-check,cell-info,cell-price,cell-count,cell-total,cell-opera
            }
        },
        cart-list:{
            cart-table>tr>td{
                cell-check,cell-img,cell-info,cell-price,
                cell-count{
                    span(-),input(readonly),span(+)
                },
                cell-total,cell-opera
            }
        },
        cart-footer:{
            select-con{
                input:checkbox
                label全选
            },
            delete-con{
                span>(i.fa-trash-o,span删除选中)
            },
            submit-con{
                span总价,
                span¥4444,
                span.btn去结算
            },
        }
    }
    - 逻辑部分
    2. 加载页面onLoad,加载购物车loadCart,封装多次使用的渲染购物车renderCart方法
    3. 页面checkbox点击事件{
        selectProduct-参数productId-接口地址:select.do,
        unSelectProduct-参数productId-接口地址:un_select.do,
        selectAllProduct-接口地址:select_all.do,
        unSelectAllProduct-接口地址:un_select_all.do
    },成功以后调用render方法,重新渲染购物车
    4. cell-count点击事件,判断值是否合法(大于1小于最大值),
    updateProduct-参数:productId,count-接口地址:update.do
    5. 删除,单个删除和批量删除都是同一个接口,所以封装该方法deleteProduct(productIds)
    deleteProduct-参数:productIds(单个或多个productId,用逗号分隔)
    6. 选中删除,处理选中的商品,将productid取出,并拼接成字符串传入接口
    7. 去结算,缓存数据,并简单的检查一下数据是否合法(是否有数据,价格是否大于0)
    8. nav部分的购物车也可以通过每次的render方法进行更新

##### 订单确认页面开发
    - html构建思路{
        panel:{
            h1.panel-title收货地址,
            div.panel-body,address-con{
                address-item{
                    address-title,
                    address-detail,
                    address-opera(编辑,删除)
                },
                address-item{
                    address-title,
                    address-detail,
                    address-opera(编辑,删除)
                },
                address-item,address-add{
                    div.address-new>i.fa-plus,div.text使用新地址
                },
            }
        },
        panel:{
            h1.panel-title,
            div.panel-body,product-con{
                table.product-table{
                    tr>th('&nbsp;'),th('商品描述'),th(价格),th(数量),th(小计)
                    tr>td(img),td(info),td(price),td(count),td(total)
                }
            }
            div.panel-footer{

            }
        }
    }
    - css要注意的地方:
        1. display:none;属性会使元素失去高度,而visibility能见度:visible可见/hidden隐藏

### 2018/2/23
##### 商品确认页
    - js逻辑部分
        1. 这个页面需要了解的接口信息
        address部分:{
            '获取地址列表':渲染页面中address信息,
            '根据shippingId选择一条地址的信息':弹出modal框的地址信息,
            '添加新地址':点击+号弹出modal框架,填完以后保存一条地址信息操作,
            '更新地址': 点击编辑按钮,修改信息保存修改以后的信息,
            '删除一条地址':点击删除按钮,删除一条地址信息
        },
        order部分{
            '获取商品列表':渲染页面商品list,
            '提交订单':提交订单按钮
        }
        2. 有两个部分需要渲染:address-list,product-list
        3. 地址的选择,点击以后添加active类,同时删除其他的active类,并缓存住该地址的id
        4. 订单提交,判断是否有shippingId,有的话直接提交,然后跳转到
        ./payment.html?orderNumber=res.orderNO   没有的话则弹出提示
        5. 创建modal层
            - html构建:{
                modal-wrap(渲染选择){
                    modal(全屏遮罩){
                        modal-container{
                            modal-header>(h1,i.fa-close),
                            modal-body{
                                div.form(假form){
                                    div.form-line{
                                        label.label收件人姓名,
                                        input.form-item#receiver-name
                                    },
                                    div.form-line所在城市{
                                        select>option#receiver-province
                                        select>option#receiver-city
                                    },
                                    div.form-line详细地址#receiver-address,
                                    div.form-line收件人手机#receiver-phone,
                                    div.form-line邮政编码#receiver-zip,
                                    div.form-line>a.btn address-btn
                                }
                            }
                        }
                    }
                }
            }
            - css部分:
            1. 全屏遮罩层position:fixed;top,right,bottom,left全部设置为0
            2. 透明兼容 background:#eee;background:rgba();高级写法写在后面
            3. oveflow-x:hidden;overflow-y:auto;防止左右滚动
            - js逻辑部分:
                - 基本的对象构建逻辑:
                1. 该对象为modal层对象,显然会有show和hide两个行为.
                2. 弹出以后(show方法)有两种情况:一是更新,二是添加.
                3. 所以要告诉show方法是更新操作还是添加操作,传入参数(option)
                4. option是引用页面传来的,所以可以通过加回调函数的形式来运行引用页面的方法
                (比如重新加载页面)
                5. modal不是通过display属性弹出,而是模板渲染出来的.
                6. 所以hide方法可以用$.empty().
                empty() 方法从被选元素移除所有内容，包括所有文本和子节点。
                - 添加地址的流程分析:
                1. 点击address-add弹出modal框,
                2. 选择省份的时候,使用change事件监听省份,加载城市
                3. 点击保存收货地址,验证数据是否合法,然后调用'添加新地址'接口,
                4. 重新渲染address-list
                - 编辑地址的流程分析:
                1. 点击address-edit弹出modal框,
                2. modal-title>h1要变成'编辑地址'
                3. 回填下面的各个字段
                4. 渲染出省份字段,并且选择数据中给出的省份,然后渲染出城市列表,并选中数据中的城市.如果没有选择则给出'请选择'
                5. 点击保存收货地址后做一个验证,通过验证以后调用'更新地址'接口
                6. 重新渲染address-list
                - 删除地址
                1. 点击删除按钮
                2. 调用'删除一条地址'接口
                3. 重新渲染address-list
            - 省市二级联动处理
                1. 在util目录下创建相应的模块
                2. 该模块有两个方法,获取省份信息,获取城市信息(需要传入省份)
                3. for(var key in Array){}for in遍历用于遍历对象,key(键)Array[key](值)

### 2018/2/24
##### 继续开发订单确认页的逻辑
    - 完成这个本项目中逻辑最复杂的页面
    1. 编辑按钮如果用on('click','.element',function)来注册事件,每次点击都会给element元素添加新的事件,
    如果回调函数中是调用接口的方法,则会多次调用接口出现bug

##### order-list页面开发
    - html构建{
        panel:{
            panel-title(订单列表),
            panel-body,order-list-wrap:{
                order-list-table{
                    tr>th*5:cell-img,cell-info,cell-price,cell-count,cell-total
                },
                order-list-table,order-list-item:{
                    tr>td.order-info(colspan="5")>span.order-text*5,
                    tr>td*5:cell-img,cell-info,cell-price,cell-count,cell-total
                }
            }
        }
    }
<<<<<<< HEAD
    主要逻辑页面基本完工,只剩下支付页面和优化部分.这个项目中不做这个部分了
=======



##### 剩下两个简单的about,detail没有复杂的逻辑,照搬原来写好的代码,
###该项目的前端部分到此结束

***

#####工作时间为11个工作日.接下来开始vue框架的练习
>>>>>>> phoock-mmall-fe_v1.0
