/*
 * @Description: 公用接口类
 * @Author: zhuzhida
 * @Date: 2018-11-07 11:16:02
 * @LastEditTime: 2018-11-29 14:10:43
 * @LastEditors: Please set LastEditors
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
   * @param {string} userInfo 用户信息
   */
  getUserOpenId(code, userInfo = '') {
    return this.http.post("wx/wxLogin", {
      code: encodeURIComponent(code),
      source: this.http.source,
      userInfo: encodeURIComponent(userInfo)
    });
  }
}

export default Interface;