// xxx-index.js

import { XxPager } from "./tools/xx-pager"

Page({

  data: {
    zd: XxPager.initZd(),
    lag: getApp().globalData.language || "zh-Hans",
    wI: getApp().globalData.windowInfo || {},
  },

  ynData: {
    pageId: "xxx-index",
  },

  onLoad() {

  },


})