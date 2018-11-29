import Config from './config/config';
import CanvasUtil from './js/canvasUtil.js';
import HttpUtil from './js/httpUtil.js';
import Interface from './js/interface.js';
import CheckUtil from './js/checkUtil.js';
class Common {
  /**
   * 
   * @param {string} host 请求地址
   * @param {int} source 来源，1留学计算器，2，GPA,3高考选校5.留学要闻6.留学日历7.汇率计算器
   * @param {string} redirect 授权成功后跳转的页面
   */
  static init(option) {
    let config = new Config(option);
    let httpUtil = new HttpUtil(config);
    let _interface = new Interface(httpUtil);
    this.openid = wx.getStorageSync('openid'),
      this.userInfo = wx.getStorageSync('userInfo');
    if (!this.openid) {
      new CheckUtil(config);
    }
    return {
      HttpUtil: httpUtil,
      Interface: _interface,
      CanvasUtil,
      Config: config,
      openid: this.openid,
      userInfo: this.userInfo
    }
  }
}
export default Common;