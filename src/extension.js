// 插件入口文件

const aliPage = require("./new-alipage")
const aliComp = require("./new-alicomp")
const wxPage = require("./new-wxpage")
const wxComp = require("./new-wxcomp")

// 插件被激活的入口
function activate(context) {
  aliPage.register(context)
  aliComp.register(context)
  wxPage.register(context)
  wxComp.register(context)
}


// 插件被钝化的入口
function deactivate() {}


module.exports = {
  activate,
  deactivate
}