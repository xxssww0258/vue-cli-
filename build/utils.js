//这个文件是一些工具函数
//主要是为vue-loader 添加rules

var path = require('path')//引入路劲模块
var config = require('../config')//引入config.index配置对象
var ExtractTextPlugin = require('extract-text-webpack-plugin')//引入抽取css文件插件

exports.assetsPath = function (_path) { //出口一个  资源路径函数
  var assetsSubDirectory = process.env.NODE_ENV === 'production' //当为生产环境
    ? config.build.assetsSubDirectory														//config对象中的 static
    : config.dev.assetsSubDirectory															//config对象中的 static
  return path.posix.join(assetsSubDirectory, _path)							//拼接对应的文件
}

exports.cssLoaders = function (options) {//出口一个cssloader的配置函数
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',//如果为生产环境  true==压缩css文件
      sourceMap: options.sourceMap             //获取执行 exports.styleLoader时传的options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) { //生产一个加载loader 函数
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {//如果带了提取参数
      return ExtractTextPlugin.extract({
        use: loaders,//使用  XXloader
        fallback: 'vue-style-loader'//编译后用什么loader来提取css文件
      })
    } else {
    	console.log(['vue-style-loader'].concat(loaders))
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
			//[ 'vue-style-loader',
			//{ loader: 'css-loader',
			//  options: { minimize: false, sourceMap: false } } 
			//]
    postcss: generateLoaders(),
			//[ 'vue-style-loader',
			//{ loader: 'css-loader',
			//  options: { minimize: false, sourceMap: false } } 
			//]
    less: generateLoaders('less'),
//	    [ 'vue-style-loader',
//			  { loader: 'css-loader', options: { minimize: false, sourceMap: false } },
//			  { loader: 'less-loader', options: { sourceMap: false } } 
//	    ]
    sass: generateLoaders('sass', { indentedSyntax: true }),
//		   [ 'vue-style-loader',
//			  { loader: 'css-loader',options: { minimize: false, sourceMap: false } },
//			  { loader: 'sass-loader',options: { indentedSyntax: true, sourceMap: false } } 
//		   ]
    scss: generateLoaders('sass'),
//	    [ 'vue-style-loader',
//			  { loader: 'css-loader',options: { minimize: false, sourceMap: false } },
//			  { loader: 'sass-loader', options: { sourceMap: false } } 
//	    ]
    stylus: generateLoaders('stylus'),
//		    [ 'vue-style-loader',
//			    { loader: 'css-loader',options: { minimize: false, sourceMap: false } },
//				  { loader: 'stylus-loader', options: { sourceMap: false } } 
//		    ]
    styl: generateLoaders('stylus')
//	    [ 'vue-style-loader',
//			  { loader: 'css-loader',options: { minimize: false, sourceMap: false } },
//			  { loader: 'stylus-loader', options: { sourceMap: false } } 
//	    ]
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)//调用上面的cssloader的配置函数  得到一个对象{css: generateLoaders(),postcss: generateLoaders()...}
  for (var extension in loaders) {//遍历这个对象
    var loader = loaders[extension]
    output.push({//把值塞进一个空的数组里面
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
//	  	[
//				{
//					test:/\.css?$/,
//					use:[
//						'vue-style-loader',
//						{loader:'css-loader',options:{ minimize: false, sourceMap: false }},
//					]
//				},
//			]
  return output
}