/* eslint-disable */

//开发环境下   每一个入口文件都会被引入这个东西
//估计是为了兼容某些东西
require('eventsource-polyfill')//事件补丁
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')

hotClient.subscribe(function (event) {//这个function 应该就是dev-server里的 cb()
  if (event.action === 'reload') {
    window.location.reload()
  }
})
