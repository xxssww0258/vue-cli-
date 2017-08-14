var utils = require('./utils') //引入工具函数
var webpack = require('webpack') //引入webpack
var config = require('../config') //引入config/index配置对象
var merge = require('webpack-merge') //引入webpack合并
var baseWebpackConfig = require('./webpack.base.conf')//引入基础模块
var HtmlWebpackPlugin = require('html-webpack-plugin')//引入生成HTML文件插件
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')//引入报错插件

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {//遍历几个入口文件
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])//得到{app:['./build/dev-client','app']} 赋值给webpack的配置对象
})

module.exports = merge(baseWebpackConfig, {//合并webpack
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })//生成module对象 详情在utils
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',//生成一个只告诉你哪一行错误的map文件
  plugins: [
    new webpack.DefinePlugin({//设置全局变量的插件
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
//  new webpack.optimize.OccurenceOrderPlugin()//是为组件和模块分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID，通过分析ID，可以建议降低总文件的大小。
    new webpack.HotModuleReplacementPlugin(),//启用模块热替换    配合webpack-hot-middleware中间件
    new webpack.NoEmitOnErrorsPlugin(),//保输出资源不会包含错误
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({//生成html文件
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()//报错文件插件
  ]
})
