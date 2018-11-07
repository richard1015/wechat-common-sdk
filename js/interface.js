/*
 * @Description: 公用接口类
 * @Author: zhuzhida
 * @Date: 2018-11-07 11:16:02
 * @LastEditTime: 2018-11-07 11:18:12
 * @LastEditors: zhuzhida
 */
/**
 * 公用接口类
 *
 * @class Interface
 */
class Interface {
  constructor(http) {
    this.http = http;
  }
  /**
   * 获取微信openId
   * @param {string} code 通过wx.login 获取code
   */
  getUserOpenId(code) {
    return this.http.post("wx/wxcallback", {
      code: encodeURIComponent(code),
      source: this.source,
      encryptedData: ''
    });
  }
}

export default Interface;