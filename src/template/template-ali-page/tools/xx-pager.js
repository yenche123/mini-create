// tools/xx-pager.js

import lang from "./lang"

class XxPager {

  static initZd() {
    let lag = getApp().globalData.language || "zh-Hans"
    return lang[lag] || lang["zh-Hans"]
  }

}


export { XxPager }