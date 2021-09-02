// 生成 微信小程序 页面
const vscode = require('vscode')
const util = require("./utils/util")
const fs = require("fs");
const path = require("path");

async function main(uri) {
  let rightPath = uri.path
  if (rightPath[0] === "/" || rightPath[0] === "\/") {
    rightPath = rightPath.substring(1)
  }

  let packName = await util.getPackageName()
  if (!packName) return
  if (!util.checkPackageName(packName)) return
  if (util.isFolderExist(rightPath, packName)) return

  /********************** 添加路径到 app.json ******************/
  const rootPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
  const fileName = path.resolve(uri.fsPath, `${packName}/${packName}`);
  const [_, filePath] = fileName.split(rootPath);
  const newPath = filePath.replaceAll("\\", "/").slice(1);
  const file = path.resolve(rootPath, "app.json");
  try {
    if (!fs.existsSync(file)) throw "根目录不存在app.json文件";
    fs.readFile(file, (err, data) => {
      const app = JSON.parse(data);
      app.pages.unshift(newPath);
      fs.writeFileSync(file, JSON.stringify(app, null, "\t"));
    });
  } catch (error) {
    vscode.window.showErrorMessage(error);
  }

  // 生成 XxPager
  // toolKebabCase: xxx-helper
  // toolPascalCase: XxxHelper
  let { toolKebabCase, toolPascalCase } = util.getToolerName(packName, "PAGE")

  let sourceFolder = path.join(__dirname, "template", "template-wx-page")
  let targetFolder = path.join(rightPath, packName)

  //在目标路径里创建文件夹
  fs.mkdirSync(targetFolder)

  let s1 = "" //原文件路径
  let s2 = "" //目标文件路径
  let fileData = "" //文件数据

  //处理 js 文件
  try {
    s1 = path.join(sourceFolder, "index.js")

    fileData = fs.readFileSync(s1, 'utf-8')
    fileData = fileData.replace(/XxPager/g, toolPascalCase)
    fileData = fileData.replace(/xx-pager/g, toolKebabCase)
    fileData = fileData.replace(/xxx-index/g, packName)

    s2 = path.join(targetFolder, `${packName}.js`)

    await writeFile(s2, fileData)

  } catch (err) {
    console.log("出现 读写 js 文件错误......")
    console.log(err)
  }


  // 处理 json 文件
  try {
    s1 = path.join(sourceFolder, "index.json")
    fileData = fs.readFileSync(s1, 'utf-8')
    s2 = path.join(targetFolder, `${packName}.json`)

    await writeFile(s2, fileData)

  } catch (err) {
    console.log("出现 读写 json 文件错误......")
    console.log(err)
  }


  // 处理 wxml 文件
  try {
    s1 = path.join(sourceFolder, "index.wxml")
    fileData = fs.readFileSync(s1, 'utf-8')
    fileData = fileData.replace(/xxx-index/g, packName)
    s2 = path.join(targetFolder, `${packName}.wxml`)

    await writeFile(s2, fileData)

  } catch (err) {
    console.log("出现 读写 wxml 文件错误......")
    console.log(err)
  }


  // 处理 wxss 文件
  try {
    s1 = path.join(sourceFolder, "index.wxss")
    fileData = fs.readFileSync(s1, 'utf-8')
    fileData = fileData.replace(/xxx-index/g, packName)
    s2 = path.join(targetFolder, `${packName}.wxss`)

    await writeFile(s2, fileData)
  } catch (err) {
    console.log("出现 读写 wxss 文件错误......")
    console.log(err)
  }


  /******************* 开始处理第二层 tools 文件夹 ******************/

  // 改变路径 
  sourceFolder = path.join(sourceFolder, "tools")
  targetFolder = path.join(targetFolder, "tools")

  // 创建 tools 文件夹
  fs.mkdirSync(targetFolder)

  //处理 xx-pager.js 文件
  try {
    s1 = path.join(sourceFolder, "xx-pager.js")

    fileData = fs.readFileSync(s1, 'utf-8')
    fileData = fileData.replace(/XxPager/g, toolPascalCase)
    fileData = fileData.replace(/xx-pager/g, toolKebabCase)

    s2 = path.join(targetFolder, `${toolKebabCase}.js`)

    await writeFile(s2, fileData)

  } catch (err) {
    console.log("出现 读写 xx-pager.js 文件错误......")
    console.log(err)
  }

  //处理 lang.js
  try {
    s1 = path.join(sourceFolder, "lang.js")
    fileData = fs.readFileSync(s1, 'utf-8')
    s2 = path.join(targetFolder, `lang.js`)

    await writeFile(s2, fileData)

  } catch (err) {
    console.log("出现 读写 lang.js 文件错误......")
    console.log(err)
  }

  /********************** 用编辑器打开 .js 文件 ******************/
  targetFolder = path.join(targetFolder, `../${packName}.js`)
  vscode.window.showTextDocument(vscode.Uri.file(targetFolder))

  console.log("执行结束....................")
}


async function writeFile(url, data) {
  let _write = (a, b) => {
    fs.writeFile(url, data, (err) => {
      if (err) {
        b(err)
        return
      }

      a({ msg: "ok" })
    })
  }

  return new Promise(_write)
}


function register(context) {
  let command = vscode.commands.registerCommand("miniCreate.wxMini.createPage", (uri) => {
    if (!uri) {
      const TIP = "没有文件路径。请在右侧目录树里右键来执行命令"
      vscode.window.showWarningMessage(TIP, "👌", "hsy nb")
      return
    }

    main(uri)
  })

  context.subscriptions.push(command)
}

module.exports = {
  register
}
