var path = require('path')//引入路径文件
var utils = require('./utils')//引入工具函数
var config = require('../config')//引入config.index对象
var vueLoaderConfig = require('./vue-loader.conf')//得到一个rules对象 和 transformToRequire对象

function resolve (dir) {//一个获取绝对路径的函数
  return path.join(__dirname, '..', dir)
}

module.exports = {//默认配置 ,通过webpack-merge合并成最终的输出对象
  entry: {//入口文件
    app: './src/main.js'
  },
  output: {//出口文件
    path: config.build.assetsRoot,// ../dist的绝对路径
    filename: '[name].js',//main.js
    publicPath: process.env.NODE_ENV === 'production'//如果是生产环境
      ? config.build.assetsPublicPath   //  ./
      : config.dev.assetsPublicPath     //   /
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],//省略的后缀
    alias: {//简写路径
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,//识别.vue文件
        loader: 'vue-loader',
        options: vueLoaderConfig//这个rules因为是使用vue-loader的所以没发现less,sass...loader不会报错
      },
      {
        test: /\.js$/,//es-6语法
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,//转base64
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,//转base64
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,//转base64
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
