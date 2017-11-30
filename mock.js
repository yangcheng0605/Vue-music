var Mock = require('mockjs')
var fs = require('fs')
/* eslint-disable */
var data = Mock.mock({
  "user":[]
})
// 写入到db.json
fs.writeFile('db.json', JSON.stringify(data, null, 4), function (err) {
  if (err) {
    return console.error(err)
  }
  console.log("数据写入成功！")
})
