var merge = require('webpack-merge')//引入webpack-merge
var prodEnv = require('./prod.env')//{NODE_ENV: '"production"'}

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})//合并之后还是{NODE_ENV: '"production"'}
