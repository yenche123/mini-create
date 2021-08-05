//工具函数
const vscode = require('vscode');
const fs = require("fs");
const path = require("path");

// 为该文件夹命名
async function getPackageName(pType = "PAGE") {
  let pName = pType === "PAGE" ? "页面" : "组件"

  let msg = await vscode.window.showInputBox({
    placeHolder: `请输入${pName}名称`,
  })

  return msg || ""
}



/**
 * 为 Tool 命名，比如生成 XxPager 或 XxHelper
 * @param {*} name 文件夹名称
 * @param {*} pType 文件夹类型 PAGE表示页面  COMPONENT表示组件
 * @return {Object} {toolKebabCase: "xxx-helper", toolPascalCase: "XxxHelper"}
 */
function getToolerName(name, pType = "PAGE") {
  let tooler = pType === "PAGE" ? "pager" : "helper"

  let obj = {
    toolKebabCase: "",
    toolPascalCase: "",
  }

  if (!name) {
    obj.toolKebabCase = "xx-" + tooler
    obj.toolPascalCase = "Xx" + tooler[0].toUpperCase() + tooler.substring(1)
    return obj
  }


  let list = name.split("-")

  if (name.length < 4 || list.length < 2) {
    obj.toolKebabCase = "" + name + "-" + tooler
    obj.toolPascalCase = name[0].toUpperCase() + name.substring(1) + tooler[0].toUpperCase() + tooler.substring(1)
    return obj
  }

  let str = ""

  for (let i = 0; i < list.length; i++) {
    let v = list[i]
    str += v[0]
  }


  obj.toolKebabCase = "" + str + "-" + tooler
  obj.toolPascalCase = str[0].toUpperCase() + str.substring(1) + tooler[0].toUpperCase() + tooler.substring(1)
  return obj
}

/**
 * 
 * @param {String} name 文件夹名称
 * @return {Boolean} true: 合规    false: 不合规  
 */
function checkPackageName(name) {
  if (!name || typeof name !== "string") {
    vscode.window.showWarningMessage("名称不存在")
    return false
  }

  if (name.length < 2) {
    vscode.window.showWarningMessage("名称长度过短")
    return false
  }

  if (name[0] === "-" || name[name.length - 1] === "-") {
    vscode.window.showWarningMessage("不能以 - 开头或结尾")
    return false
  }

  let isAllEng_ = true
  for (let i = 0; i < name.length; i++) {
    let v = name[i]
    if (v >= "a" && v <= "z") continue
    if (v === "-") continue
    isAllEng_ = false
    break
  }

  if (!isAllEng_) {
    vscode.window.showWarningMessage("名称命名不规范")
    return false
  }

  return true
}



function isFolderExist(url, name) {
  let _url = path.join(url, name)
  let exi = fs.existsSync(_url)
  if (exi) {
    vscode.window.showWarningMessage("文件夹已存在")
  }
  return exi
}

module.exports = {
  getToolerName,
  getPackageName,
  checkPackageName,
  isFolderExist,
}