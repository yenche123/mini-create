# mini-create 小程序助手

欢迎来到 mini-create 小程序助手

## 功能

1. 支持 `右键文件夹` 快速新增支付宝（ali）小程序页面

2. 支持 `右键文件夹` 快速新增支付宝（ali）小程序组件

3. 支持 `右键文件夹` 快速新增微信（wx）小程序页面

4. 支持 `右键文件夹` 快速新增微信（wx）小程序组件

## 使用方式

1. 在 VS Code 上安装插件

2. 在 VS Code 左侧目录树（EXPLORER） 上任意节点（文件夹）上，右键选择的`新建 小程序页面或组件`

3. 选择小程序平台（阿里 or 微信）和新增的类型（页面 or 组件）

4. 为页面或组件命名

5. 新建的小程序`页面或组件`，是在你右键点击的节点下，再新建一个文件夹，在该文件夹中再添加`页面或组件`所需的文件

> 例如: 我在节点树 `test` 文件夹上右键新增页面 `test-page`，页面的入口 `.js` 文件会有如下的路径 `test/test-page/test-page.js` 


<img src="https://raw.githubusercontent.com/yenche123/mini-create/main/docs/screenshots1.png" width="680" />

<br>

<br>

## 注意事项

- 新增的页面或组件，请以 `kebab-case` 烤肉串风格进行命名，即名称里全为`英文小写`，并且以 `-` 字符串联单词 

<br>

## 调试本项目

1. `git clone https://github.com/yenche123/mini-create.git`

2. `cd mini-create`

3. 打开 `VS Code`, 点击`F5`，会开启新的窗口 `Extension Development Host`

4. 在新的窗口上测试

### 打包

1. 安装: `npm i vsce -g`

2. 打包: `vsce package`

<br>


## 开源地址

[https://github.com/yenche123/mini-create](https://github.com/yenche123/mini-create)

