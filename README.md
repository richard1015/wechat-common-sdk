## common-sdk ?
场景：目前工作中的项目需要包含并使用另一个项目。 也许是第三方库，或者你独立开发的，用于多个父项目的库。 现在问题来了：你想要把它们当做两个独立的项目，同时又想在一个项目中使用另一个。

我们举一个例子。 假设你正在开发一个网站然后创建了 Atom 订阅。 你决定使用一个库，而不是写自己的 Atom 生成代码。 你可能不得不通过 CPAN 安装或 Ruby gem 来包含共享库中的代码，或者将源代码直接拷贝到自己的项目中。 如果将这个库包含进来，那么无论用何种方式都很难定制它，部署则更加困难，因为你必须确保每一个客户端都包含该库。 如果将代码复制到自己的项目中，那么你做的任何自定义修改都会使合并上游的改动变得困难。

Git 通过子模块来解决这个问题。 子模块允许你将一个 Git 仓库作为另一个 Git 仓库的子目录。 它能让你将另一个仓库克隆到自己的项目中，同时还保持提交的独立。

##common-sdk有哪些功能？

* Interface  小程序公用接口类
* HttpUtil  小程序http请求类
* CanvasUtil 小程序 canvas工具类
* 自动统一授权入口

## 使用方法

* 进入项目根路径  执行git submodule add http://github.com/richard1015/common-sdk.git
* 更新已存在 submodule 子模块时  需执行 ，否则项目中common-sdk 文件夹内容为空
   *  1.git submodule init
   *  2.git submodule update

```javascript
  //app.js
import common from "./common-sdk/common.js";
var util = require("./utils/util.js");
App({
  commonSdk: {},
  onLaunch: function() {
    var self = this
    console.log('App Launch')
    self.util = util;
    self.commonSdk = common.init({
      // host:'http://192.168.1.128:18888/',
      source: 7, //7.汇率计算器
      redirect: "/pages/index/index"//授权成功回调地址
    });
  },
  onShow: function() {
    console.log('App Show')
  },
  onHide: function() {
    console.log('App Hide')
  }
}) 

```


```javascript
// pages/addCurrency/addCurrency.js
let {
  commonSdk,
  util
} = getApp();
Page({
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this;
    //获取币种接口
    commonSdk.HttpUtil.post("exchange/currency", {
      openId: commonSdk.openid,
      needRmb: true
    }).then((res) => {
      if (res.State == 0) {
        console.log(res)
        let exist = [],
          array = [];
        res.Value.forEach(item => {
          if (item.isExist == 1) {
            exist.push(item)
          } else {
            array.push(item)
          }
        })
        self.setData({
          exist,
          array,
          oldArray: array
        });
      }
    });
  }
})
```