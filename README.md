## Rollup 类库脚手架
> 下面是使用流程

### 克隆本项目
```
git clone https://github.com/q-jason/template-rollup.git
```

### 修改 rollup.config.js 预设配置
> 主要修改以下地方
```javascript
// rollup.config.js

/**
 *  打包后文件的名称
 *  umd iife 对外暴露的 window 属性名
 *  TODO: 请指定库名称
 **/
const NAME = '_'

/**
*  打包后的文件
*  可以指定一个数组
*  指定打包不同的风格
*    ems  - ES6 风格
*    cjs  - commonJS 风格
*    umd  - 通用模块定义，以amd，cjs 和 iife 为一体
*    amd  - requireJS 风格
*    iife - 适合于 script 标签的方式
*      若不指定 name 属性，则会是一个自调用的匿名函数
**/
output: [ /* ... */ ]
```

### 修改 package.json
> 各个入口文件属性解析: <br/>
>   main: commonjs <br/>
>   module: ES <br/>
>   unpkg: script 标签引入
```json
{
  "name": "template-rollup",
  "version": "0.0.0",
  "main": "dist/XXXXXX.cjs.js",
  "module": "dist/XXXXXX.esm.js",
  "unpkg": "dist/XXXXXX.js",
  "author": "",
  "description": ""
}
```

### 实现类库
> 用 src/index.js 作为入口，实现类库
```bash
# 启动开发环境
# 会监听文件变化自动进行打包
# 此时 process.env.NODE_ENV = 'development'
npm run dev
```

### 测试
> docs/index.html <br/>
> 方便使用 github page 作为预览页面

### 文档
> 推荐写在 README.md 中 <br/>
> 若非小型类库，则建议自行添加其余文档类库自行实现

### 打包项目
```bash
# 打包项目
# 此时 process.env.NODE_ENV = 'production'
npm run build
```

### 提交 github
> 提交到 git 仓库中 <br/>
> 并设置 github page 供预览

### 发布到 npm
> 供其余项目依赖