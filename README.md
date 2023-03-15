## vue-slot-machine
> 基于 vue 的老虎机组件

### 效果 demo
> https://slylxdymj.github.io/vue-slot-machine/

### npm
```
npm i --save vue-slot-machine
```

### es use
```javascript
import vue from 'Vue'
import vueSlotMachine from 'vue-slot-machine'

Vue.use(vueSlotMachine);
```

```html
<template>
  <!-- 具体看下面的 props 吧 -->
  <vue-slot-machine .../>
</template>
```

### props
```javascript
  export default {
    props: {
      /**
       *  雪碧图
       *  参考 docs/sprite-map.jpg
       **/
      spriteMap: {
        type: String,
        required: true
      },

      /**
       *  雪碧图上的项目数
       **/
      itemNum: {
        type: Number,
        required: true
      },

      /**
       *  列数
       **/
      colNum: {
        type: Number,
        default: 3
      },

      /**
       *  雪碧图的宽度
       *  或者说
       *  雪碧图每一项的宽度
       **/
      width: {
        type: Number,
        required: true
      },

      /**
       *  雪碧图每一项的高度
       **/
      itemHeight: {
        type: Number,
        required: true
      },

      /**
       *  每一项的动画总时长
       *  PS: 不是整个抽奖时间总时长
       **/
      duration: {
        type: Number,
        default: 2000
      },

      /**
       *  不同列之间动画的间隔
       **/
      interval: {
        type: Number,
        default: 500
      },

      /**
       *  动画过程转多少 "无用轮"
       *  或者少
       *  动画至少转多少圈，才会停止
       **/
      uselessNum: {
        type: Number,
        default: 3
      }
    }
  }
```
