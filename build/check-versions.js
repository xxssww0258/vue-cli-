var chalk = require('chalk')//命令行颜色
var semver = require('semver')//版本比较工具
var packageConfig = require('../package.json') //引入package对象
var shell = require('shelljs') //unix命令行工具
function exec (cmd) { //cmd命令 返回命令
  return require('child_process').execSync(cmd).toString().trim()
}

var versionRequirements = [ //新建一个versionRequirements数组
  {//默认带一个node对象
    name: 'node',
    currentVersion: semver.clean(process.version),//process.version='v8.1.3' =>'8.1.3'
    versionRequirement: packageConfig.engines.node//>= 4.0.0
  },
]

if (shell.which('npm')) { //如果有npm的话
  versionRequirements.push({//往versionRequirements塞一个npm对象
    name: 'npm',
    currentVersion: exec('npm --version'),//5.0.3
    versionRequirement: packageConfig.engines.npm//>= 3.0.0
  })
}

module.exports = function () {
  var warnings = []
  for (var i = 0; i < versionRequirements.length; i++) {// 就循环两次
    var mod = versionRequirements[i]
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {//如果不符合要求就塞进warning数组里面
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )//node：3.0.0 should be >= 4.0.0
    }
  }

  if (warnings.length) {//如果有报错信息
    console.log('')//空一行
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()//空一行
    for (var i = 0; i < warnings.length; i++) {
      var warning = warnings[i]
      console.log('  ' + warning)// '    node：3.0.0 should be >= 4.0.0' 
    }
    console.log()//空一行
    process.exit(1)//结束进程,抛出错误代码1  代码1是自定义的
  }
  
  //否则什么事都不干
}
