/*
 * @Description: HttpUtil公用类
 * @Author: zhuzhida
 * @Date: 2018-11-06 18:35:07
 * @LastEditTime: 2018-11-07 09:59:16
 * @LastEditors: zhuzhida
 */
class HttpUtil {
  /**
   * @param {string} host 请求地址
   * @param {int} source 来源，1留学计算器，2，GPA,3高考选校5.留学要闻6.留学日历7.汇率计算器
   */
  constructor({ host, source }) {
    this.host = host;
    this.source = source;
  }
  /**
   * 检查网络状态
   */
  checkNetworkType() {
    wx.getNetworkType({
      success: function (res) {
        // 返回网络类型, 有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        var networkType = res.networkType
        if (networkType != "none") {

        } else {
          wx.showModal({
            title: '温馨提示',
            content: "请检查您的手机网络是否打开！",
            showCancel: false,
            success: function (res) {

            }
          });
        }
      }
    })
  }
  get() { }
  /**
   * 
   * @param {string} cmd 请求命令
   * @param {object} param 请求参数对象
   * @param {Boolean} loadingState 是否显示加载动画 
   * @param {Boolean} errMsgState 是否显示报错信息
   */
  post(cmd, param, loadingState = true, errMsgState = true) {
    var self = this;
    var url = `${self.host}${cmd}`;
    console.log(`${url}?${JSON.stringify(param)}`);
    return new Promise((resolve, reject) => {
      //检查是否需要加载动画
      if (loadingState) {
        wx.showLoading({
          // title: '正在请求...',
          mask: true
        });
      }
      wx.request({
        url: url,
        data: param,
        method: "post", // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'source': self.source, //来源，1留学计算器，2，GPA,3高考选校5.留学要闻6.留学日历7.汇率计算器
        }, // 设置请求的 header
        success: function (res) {
          // success
        },
        fail: function (ex) {
          // fail
          console.log(ex);
        },
        complete: function (response) {
          //关闭加载动画
          wx.hideLoading();

          var resData = {
            State: 0,
            Value: {},
            Msg: ""
          }
          if (response.errMsg != "request:ok") {
            resData.State = 1;
            resData.Value = {};
            resData.Msg = "系统错误,请稍后重试！";
          } else if (response.statusCode == 200) {
            if (response.data.head.code == 0) {
              if (response.data.body.code == 0) {
                resData.State = 0;
                resData.Value = response.data.body.value;
                resData.Msg = response.data.body.message;
              } else {
                resData.State = 1;
                resData.Value = response.data;
                resData.Msg = response.data.body.msg;
              }
            } else {
              resData.State = 1;
              resData.Value = response.data;
              resData.Msg = response.data.body.message;
            }
          }
          if (resData.State == 0) {
            resolve(resData);
          } else {
            //检查是否弹出错误信息
            if (errMsgState) {
              wx.showModal({
                title: '错误提示',
                content: resData.Msg,
                showCancel: false,
                success: function (res) {

                }
              });
            }
            reject(res.Msg);
          }
        }
      });
    })
  }
}

export default HttpUtil;