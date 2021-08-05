// tools/xx-helper.js

import lang from "./lang"

class XxHelper {

  static initZd() {
    let lag = getApp().globalData.language || "zh-Hans"
    return lang[lag] || lang["zh-Hans"]
  }

}


export { XxHelper }