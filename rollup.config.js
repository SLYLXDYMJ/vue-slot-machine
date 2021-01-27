/**
 *  解析 .vue 文件
 *  作用和 vue-loader 相同
 *  https://www.npmjs.com/package/rollup-plugin-vue
 **/
import vue from 'rollup-plugin-vue'

/**
 *  将 css 部分提取为文件
 *  可以通过 output 参数指定 css 文件名称
 *  https://www.npmjs.com/package/rollup-plugin-css-only
 **/
import css from 'rollup-plugin-css-only'

/**
 *  解析图片类型文件
 *  将其通过 base64 的形式打包进项目中
 *  https://www.npmjs.com/package/@rollup/plugin-image
 **/
import image from '@rollup/plugin-image'

/**
 *  转化 ES6 -> ES5 代码
 *  https://www.npmjs.com/package/@rollup/plugin-buble
 *
 *  ! 在打包 vue 组件中我尝试使用了 @rollup/plugin-babel
 *  ! 但是在打包后的代码中，始终有一部分 ES6 代码无法转换
 *  ! 暂时未找到解决办法，但是使用 buble 就可以正常转换
 **/
import buble from '@rollup/plugin-buble'

/**
 *  用于使 rollup 更方便的查找模块
 **/
import resolve from '@rollup/plugin-node-resolve'

/**
 *  rollup 推崇使用 ES6 的模块化风格
 *  这个插件使 commonjs 方式的模块也可以正常使用
 **/
import commonjs from 'rollup-plugin-commonjs'

/**
 *  打包后文件的名称
 *  umd iife 对外暴露的 window 属性名
 *  TODO: 请指定库名称
 **/
const NAME = 'vue-slot-machine'

const isPro = process.env.NODE_ENV === 'production'
const isDev = !isPro

export default {
  /**
   *  入口文件
   **/
  input: 'src/index.js',
  
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
  output: [
    {
      format: 'esm',
      file: `dist/${ NAME }.esm.js`
    },
    {
      format: 'iife',
      file: `dist/${ NAME }.js`
    }
  ],
  
  plugins: [
    commonjs(),
    resolve({
      extensions: [ '.js', '.vue' ]
    }),
    vue({
      css: true
    }),
    css({
      output: `${ NAME }.css`
    }),
    image(),
    buble({
      objectAssign: 'Object.assign'
    })
  ]
}