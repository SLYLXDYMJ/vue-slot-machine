<template>
  <div class="comp-game">
    <div
      class="comp-game-item"
      v-for="i in colNum"
      :key="i"
      :style="{
        backgroundImage: `url(${ spriteMap })`,
        width: `${ width }px`,
        height: `${ itemHeight }px`,
        backgroundPositionY: `${ scrollHResult[ i - 1 ] }px`,
        transition: resetIng ?
          'none' :
          `background-position-y ${ duration }ms ease ${ (i - 1) * interval }ms`
      }"/>
  </div>
</template>

<script>
  export default {
    name: 'comp-game',
    props: {
      /**
       *  雪碧图
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
    },
    data () {
      return {
        // 正在进行中的表示
        startIng: false,

        // 表示正在重置的表示
        resetIng: false,

        // 正在进行中的动画标识
        startTimer: null,

        // 滚动高度
        scrollHResult: []
      }
    },
    methods: {
      /**
       *  开始一次游戏
       *  @param { Boolean } [opts.goodLuck = false]  - 是否强制好运（中奖）
       *  @param { Number }  [opts.goodLuckI = null] - 强制好运的结果下标
       *  @param { Boolean } [opts.badLuck = false]   - 是否强制霉运（一定不中奖）
       **/
      start (opts = {}) {
        // 若正在进行中，则无需重复开始
        if (this.startIng) return
        else this.startIng = true

        // 参数默认值处理
        opts = {
          goodLuck: false,
          goodLuckI: null,
          badLuck: false,
          ...opts
        }

        // 定义结果数组
        let result = (() => {
          let result = []
          let random = () => {
            return Math.floor(Math.random() * (this.itemNum))
          }

          for (let i = 0, prevResultItem = null; i < this.colNum; i++) {
            let resultItem = null

            // 强制好运机制
            if (opts.goodLuck && opts.goodLuckI !== null) {
              resultItem = opts.goodLuckI
            }
            // 强制厄运机制
            else if (opts.badLuck && i === this.colNum - 1) {
              while (resultItem === null || resultItem === prevResultItem) {
                resultItem = random()
              }
            }
            // 正常随机结果
            else {
              resultItem = random()
            }

            // 记录结果（用于厄运机制）
            prevResultItem = resultItem

            // 记录结果
            result.push(resultItem)
          }

          return result
        })()

        // 一次完整的滚动最大的滚动高度
        let maxScrollHeight = this.itemHeight * this.itemNum
        // 计算 "无用圈" 的滚动距离
        let uselessScrollHeight = maxScrollHeight * this.uselessNum
        // 计算最终的滚动高度
        let scrollHResult = (() => {
          let r = []

          result.forEach(resultI => {
            r.push(uselessScrollHeight + resultI * this.itemHeight * -1)
          })

          return r
        })()
        // 计算动画总时长
        let duration = this.duration + (this.colNum - 1) * this.interval + 20

        // 重置之前的动画影响
        this.reset()

        // 等待 DOM 重绘后开始动画
        setTimeout(() => {
          // 正式赋值，开始动画
          this.scrollHResult = scrollHResult

          // 等待动画结束，发出事件
          this.startTimer = setTimeout(() => {
            this.$emit('complete', result)
            this.startIng = false
          }, duration)
        }, 20)
      },

      /**
       *  重置
       **/
      reset () {
        clearTimeout(this.startTimer)
        this.startTimer = null
        this.startIng = false
        this.resetIng = true

        let arr = []

        for (let i = 0; i < this.colNum; i++) {
          arr.push(0)
        }

        this.scrollHResult = arr

        setTimeout(() => {
          this.resetIng = false
        }, 20)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .comp-game {
    display: flex;
  }
</style>