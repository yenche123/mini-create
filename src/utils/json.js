// 处理 json 文件的工具

const fs = require('fs');

function readJSON(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(content);
}

module.exports = {
  readJSON
};