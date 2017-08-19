var utils = require('./utils')//引入工具函数
var config = require('../config')//引入config.index对象
var isProduction = process.env.NODE_ENV === 'production' //如果是生产环境

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap// 生成map
      : config.dev.cssSourceMap,//不生成
    extract: isProduction//一个参数  触发extract-text-webpack-plugin 提取css
  }),
  transformToRequire: {//再也不用把require图片写成变量了
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
