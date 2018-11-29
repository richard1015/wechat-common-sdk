/*
 * @Description: 检查工具类
 * @Author: zhuzhida
 * @Date: 2018-11-07 11:16:02
 * @LastEditTime: 2018-11-29 11:29:54
 * @LastEditors: Please set LastEditors
 */
/**
 * 检查工具类
 *
 * @class CheckUtil
 */
class CheckUtil {
  constructor({
    redirect
  }) {
    setTimeout(() => {
      wx.redirectTo({
        url: '/common-sdk/pages/auth',
      });
    }, 1000)
  }
}

export default CheckUtil;