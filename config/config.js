/*
 * @Description: config sdk
 * @Author: richard
 * @Date: 2018-11-06 16:50:05
 * @LastEditTime: 2018-11-29 14:17:36
 * @LastEditors: Please set LastEditors
 */

/**
 * Config 配置项
 */
class Config {
  /**
   * 初始化config 信息
   * @param {string} host 
   * @param {number} source 来源标识: 1. 留学计算器 2. GPA 3. 高考选校 5. 留学要闻 6. 留学日历 7. 汇率计算器 8.留学攻略
   * @param {string} redirect 授权成功后跳转的页面
   */
  constructor(option) {
    this.host = option.host || "https://****.com/";
    this.source = option.source;
    this.redirect = option.redirect || "pages/index/index";
  }
}
export default Config