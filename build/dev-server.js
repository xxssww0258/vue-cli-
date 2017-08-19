require('./check-versions')()//检测版本

var config = require('../config')//引入config/index.js综合配置对象(以下直接称config)
if (!process.env.NODE_ENV) {//如果没有设置当前环境
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)//则设置为production
}

var opn = require('opn')//跨平台start命令
var path = require('path')//路径模块
var express = require('express')//nodejs常用的一款框架res req
var webpack = require('webpack')//webpack
var proxyMiddleware = require('http-proxy-middleware')//代理中间件
var webpackConfig = process.env.NODE_ENV === 'testing'//如果当前环境为测试环境
  ? require('./webpack.prod.conf')//生产环境的webpack配置
  : require('./webpack.dev.conf')//否则开发环境的webpack配置

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port //获取config里面的端口配置
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser//获取config里面的自动打开浏览器配置,双感叹号取值就只能得到T/F 而不会有undefined/null
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable//获取config里面的代理配置

var app = express()//启动本地服务器   http服务
var compiler = webpack(webpackConfig)//执行webpack,返回一个大对象

var devMiddleware = require('webpack-dev-middleware')(compiler, {//将执行后的文件存到内存中
  publicPath: webpackConfig.output.publicPath,//公共路径
  quiet: true//安静的执行
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {//将执行后的文件不断地存到内存中
  log: false,//不打印日志
  heartbeat: 2000//间隔时间
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) { //webpack的一些原生语法,一般用来写插件 应该是监听源文件
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) { //如果源文件改动 触发某个插件 
    hotMiddleware.publish({ action: 'reload' })//发送一个事件给中间件，告诉他刷新
    cb()//执行回调
  })
})
																				//e.g 
																				//proxyTable: {
																				//'/list': {
																				//  target: 'http://api.xxxxxxxx.com',
																				//  changeOrigin: true,
																				//  pathRewrite: {
																				//    '^/list': '/list'
																				//  }
																				//}
// proxy api requests
Object.keys(proxyTable)//转数组
	.forEach(function (context) {//遍历
	  var options = proxyTable[context]
	  if (typeof options === 'string') {//key==字符串时
	    options = { target: options }
	  }
	  app.use(proxyMiddleware(options.filter || context, options))//生成各种代理路由
	})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())//重定向让浏览器走进前端路由

// serve webpack bundle output
app.use(devMiddleware)// 路由监听

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)// 路由监听

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory) //兼容语法 生成绝对路径
app.use(staticPath, express.static('./static'))// 路由监听

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...') //打印正在启动
devMiddleware.waitUntilValid(() => { //启动成功后回调函数
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)//打开浏览器
  }
  _resolve()
})

var server = app.listen(port)//监听端口8080

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
