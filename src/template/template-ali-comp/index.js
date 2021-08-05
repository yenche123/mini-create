// xxx-index.js

import { XxHelper } from "./tools/xx-helper"

Component({


  props: {

  },

  data: {
    lag: getApp().globalData.language || "zh-Hans",
    zd: XxHelper.initZd(),
  },

  didMount() {

  },

  deriveDataFromProps(nextProps) {

  },

  methods: {

  }


})