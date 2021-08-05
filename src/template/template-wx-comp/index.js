// xxx-index.js

import { XxHelper } from "./tools/xx-helper"

Component({
  options: {
    pureDataPattern: /^_/
  },

  properties: {

  },

  data: {
    zd: XxHelper.initZd(),
    lag: getApp().globalData.language || "zh-Hans",
  },

  methods: {

  }


})