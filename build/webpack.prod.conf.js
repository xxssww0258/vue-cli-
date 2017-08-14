var path = require('path')//引入路径模块
var utils = require('./utils')//工具函数
var webpack = require('webpack')//webpack
var config = require('../config')//config.index对象
var merge = require('webpack-merge')//webpack合并插件
var baseWebpackConfig = require('./webpack.base.conf')//基本webpack对象
var CopyWebpackPlugin = require('copy-webpack-plugin')//复制文件插件
var HtmlWebpackPlugin = require('html-webpack-plugin')//自动生成html导入css js插件
var ExtractTextPlugin = require('extract-text-webpack-plugin')//自动导出css插件
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')//解决extract-text-webpack-plugin代码重复问题

var env = process.env.NODE_ENV === 'testing'//如果是测试环境的话
  ? require('../config/test.env')//执行测试
  : config.build.env//当前环境为开发环境

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,//是否生成source-map文件
  output: {
    path: config.build.assetsRoot,// ./
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({ //设置全局变量为production
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({//压缩js
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({//提取css文件
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({//解决提取css文件代码重复
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({//生成html文件 导入js css
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({//提取公共代码块
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({//再提取一次，解决hash值变动
      name: 'manifest',
      chunks: ['vendor']
    }),
    // copy custom static assets
    new CopyWebpackPlugin([//复制静态文件
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

if (config.build.productionGzip) {//如果启动gzip压缩
  var CompressionWebpackPlugin = require('compression-webpack-plugin')//压缩插件

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {//是否打印报告,可视化的结果会被展示在http://localhost:8888/
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin //打印报告插件https://github.com/th0r/webpack-bundle-analyzer
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
