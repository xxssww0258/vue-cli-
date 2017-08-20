// see http://vuejs-templates.github.io/webpack for documentation.
// 这个文件是一个总配置文件对象，有点类似nginx和apache的config配置文件
var path = require('path')//引入path模块

module.exports = {
  build: {
    env: require('./prod.env'),//production
    index: path.resolve(__dirname, '../dist/index.html'),//index.html的绝对路径
    assetsRoot: path.resolve(__dirname, '../dist'),//资源根目录
    assetsSubDirectory: 'static',//资源路径
    assetsPublicPath: './',//公共路径 这里要改成./ 
    productionSourceMap: true,//是否生成source-map文件
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,//是否压缩
    productionGzipExtensions: ['js', 'css'],//压缩的拓展
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report//分析报告...从环境变量中的npm_config_report获取,不是很懂
  },
  dev: {
    env: require('./dev.env'),//{NODE_ENV: '"production"'}
    port: 8080,//本地服务器端口
    autoOpenBrowser: true,//是否自动弹窗打开浏览器
    assetsSubDirectory: 'static', //资源路径
    assetsPublicPath: '/', //公共路径
    proxyTable: {//代理配置项
//  	'api':{
//  		target: 'http://www.example.org', // target host
//      changeOrigin: true,               // needed for virtual hosted sites
//      ws: true,                         // proxy websockets
//      pathRewrite: {
//          '^/api/old-path' : '/api/new-path',     // rewrite path
//          '^/api/remove/path' : '/path'           // remove base path
//      },
//      router: {
//          // when request.headers.host == 'dev.localhost:3000',
//          // override target 'http://www.example.org' to 'http://localhost:8000'
//          'dev.localhost:3000' : 'http://localhost:8000'
//      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false//是否生成map文件
  }
}
