var merge = require('webpack-merge')//引入webpack-merge
var prodEnv = require('./prod.env')//{NODE_ENV: '"production"'}

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'//NODE_ENV 加冒号是为了兼容某些插件 避免使用了JSON.parse()生成了函数而不是字符串
})//合并之后还是{NODE_ENV: '"production"'}
