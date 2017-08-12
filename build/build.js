require('./check-versions')() //检测版本

process.env.NODE_ENV = 'production' //设置环境变量为生产环境

var ora = require('ora')//转轮
var rm = require('rimraf')//删除文件夹
var path = require('path')//路径模块
var chalk = require('chalk')//命令行颜色
var webpack = require('webpack')//引入webpack
var config = require('../config')//引入默认配置对象
var webpackConfig = require('./webpack.prod.conf')//引入配置

var spinner = ora('building for production...')//转轮显示ora
spinner.start()//开始转

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {//删除dist文件
  if (err) throw err//有如果就抛出
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()//结束转
    if (err) throw err//有错就抛出
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n')) //蓝绿色完成
    console.log(chalk.yellow( //黄色
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
