import Config from './config/config';
import CanvasUtil from './js/canvasUtil.js';
import HttpUtil from './js/httpUtil.js';
import Interface from './js/interface.js';
class Common {
  /**
   * 
   * @param {string} host 请求地址
   * @param {int} source 来源，1留学计算器，2，GPA,3高考选校5.留学要闻6.留学日历7.汇率计算器
   */
  static init(option) {
    let config = new Config(option);
    let _HttpUtil = new HttpUtil(config);
    let _Interface = new Interface(_HttpUtil);
    return {
      HttpUtil: _HttpUtil,
      Interface: _Interface,
      CanvasUtil
    }
  }
}
export default Common;