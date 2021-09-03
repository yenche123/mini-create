// 处理把新增的页面 加到 app.json 中
const vscode = require('vscode')
const util = require("./util")
const path = require('path')
const fs = require('fs')
const { readJSON, updateJSON } = require("./json")


// 主函数
/**
 * 主函数
 * @param {*} uri 路径结构
 * @param {*} packName 被添加的页面名称
 * @param {*} envType 有枚举值 wx: 微信环境  ali: 支付宝环境
 * @returns 
 */
function add(uri, packName, envType = "wx") {
  const app_json_path = _findAppJsonPath(uri)
  if (!app_json_path) return false

  let appJson = readJSON(app_json_path)
  if (!appJson) {
    return false
  }

  //获取分包所定义的字段
  let sub = envType === "wx" ? appJson.subpackages : envType === "ali" ? appJson.subPackages : []
  if (!sub) sub = []

  //分包字段不存在 直接写入到主包里
  if (sub.length < 1) {
    _writeIntoMainPackage(uri, packName, app_json_path, appJson)
    return true
  }

  const endLength = "app.json".length
  const currentPath = app_json_path.slice(0, -endLength) // currentPath 结尾有 /
  let pagePath = uri.fsPath.replace(currentPath, '').replaceAll("\\", "/") + "/" + packName + "/" + packName

  //开始遍历分包字段
  //若 root 字段存在于 页面路径的开头 就代表是在分包中
  let hasFound = false
  for (let i = 0; i < sub.length; i++) {
    let aSub = sub[i] || {}
    let { root, pages = [] } = aSub
    if (!root) continue

    let idx = pagePath.indexOf(root)
    if (idx !== 0) continue

    hasFound = true
    pages.push(pagePath.substring(root.length + 1))
    aSub.pages = pages
    sub[i] = aSub

    break
  }

  //写入到分包的 pages
  if (hasFound) {
    if (envType === "wx") appJson.subpackages = sub
    else if (envType === "ali") appJson.subPackages = sub
    fs.writeFileSync(app_json_path, JSON.stringify(appJson, null, 2))
    return true
  }

  //anyway 写入到主包里
  _writeIntoMainPackage(uri, packName, app_json_path, appJson)
  return true
}


function _findAppJsonPath(uri) {
  const projectPath = util.getWorkspacePath() //示例: d:\zzzz\ccc\ddddd...直到工作目录
  let currentPath = uri.fsPath

  while (!fs.existsSync(currentPath + path.sep + "app.json") && currentPath !== projectPath) {
    currentPath = currentPath.split(path.sep).slice(0, -1).join(path.sep)
  }

  const appJsonPath = currentPath + path.sep + 'app.json'
  if (fs.existsSync(appJsonPath)) return appJsonPath
  return ""
}


// 把页面路径 直接加到主包的 pages 里
function _writeIntoMainPackage(uri, packName, app_json_path, appJson) {
  const endLength = "app.json".length
  const currentPath = app_json_path.slice(0, -endLength)

  const pagePath = uri.fsPath.replace(currentPath, '').replaceAll("\\", "/") + "/" + packName + "/" + packName
  appJson.pages.push(pagePath)

  fs.writeFileSync(app_json_path, JSON.stringify(appJson, null, 2))
}


module.exports = {
  add,
}