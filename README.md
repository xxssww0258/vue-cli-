# 翻译webpack执行的vue-cli代码

## 使用
> 需要先删除package.json的devDependencies里的注释 再安装依赖
``` bash
# install 安装依赖
npm install

# serve with hot reload at localhost:8080 运行开发环境 监听8080端口
npm run dev

# build for production with minification 生成环境打包
npm run build

# build for production and view the bundle analyzer report 生产环境并生成报告
npm run build --report

# run unit tests 单元测试
npm run unit

# run e2e tests 端对端测试
npm run e2e

# run all tests 全部测试
npm test
```


## 先说下文件夹

``` base
.
├── build/                  # webpack 配置文件
│   └── ...
├── config/                 # 配置文件夹
│   ├── index.js                # 项目核心配置
│   └── ...
├── src/					# 项目文件夹
│   ├── main.js                 # 入口文件
│   ├── App.vue                 # 入口vue组件
│   ├── components/             # 组件
│   │   └── ...
│   └── assets/                 # 模块资源 (会被webpack处理)
│       └── ...
├── static/                     # 纯静态资源 (直接拷贝到dist/static/里面)
├── test/					# 测试文件夹
│   └── unit/                   # 单元测试
│   │   ├── specs/              # 测试规范
│   │   ├── index.js            # 测试入口文件
│   │   └── karma.conf.js       # 测试运行配置文件
│   └── e2e/                    # 端到端测试
│   │   ├── specs/              # 测试规范
│   │   ├── custom-assertions/  # 端到端测试自定义断言
│   │   ├── runner.js           # 运行测试的脚本
│   │   └── nightwatch.conf.js  # 运行测试的配置文件
├── .babelrc                # babel 配置文件
├── .editorconfig           # 编辑配置文件
├── .eslintrc.js            # eslint 配置文件
├── .gitignore              # 告诉git排除哪些文件
├── .postcssrc.js           
├── index.html              # index.html 入口模板文件
├── README.md               # markdown 说明文档
└── package.json            # 运行的脚本与相关依赖
```


## 
For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
关于如何工作的详细解释,点击[guide英文](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader)

## 参考
[https://loulanyijian.github.io/vue-cli-doc-Chinese/structure.html](https://loulanyijian.github.io/vue-cli-doc-Chinese/structure.html)
