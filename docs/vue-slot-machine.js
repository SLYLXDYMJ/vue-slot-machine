(function () {
  'use strict';

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script = {
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
    data: function data () {
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
      start: function start (opts) {
        var this$1 = this;
        if ( opts === void 0 ) opts = {};

        // 若正在进行中，则无需重复开始
        if (this.startIng) { return }
        else { this.startIng = true; }

        // 参数默认值处理
        opts = Object.assign({}, {goodLuck: false,
          goodLuckI: null,
          badLuck: false},
          opts);

        // 定义结果数组
        var result = (function () {
          var result = [];
          var random = function () {
            return Math.floor(Math.random() * (this$1.itemNum))
          };

          for (var i = 0, prevResultItem = null; i < this$1.colNum; i++) {
            var resultItem = null;

            // 强制好运机制
            if (opts.goodLuck && opts.goodLuckI !== null) {
              resultItem = opts.goodLuckI;
            }
            // 强制厄运机制
            else if (opts.badLuck && i === this$1.colNum - 1) {
              while (resultItem === null || resultItem === prevResultItem) {
                resultItem = random();
              }
            }
            // 正常随机结果
            else {
              resultItem = random();
            }

            // 记录结果（用于厄运机制）
            prevResultItem = resultItem;

            // 记录结果
            result.push(resultItem);
          }

          return result
        })();

        // 一次完整的滚动最大的滚动高度
        var maxScrollHeight = this.itemHeight * this.itemNum;
        // 计算 "无用圈" 的滚动距离
        var uselessScrollHeight = maxScrollHeight * this.uselessNum;
        // 计算最终的滚动高度
        var scrollHResult = (function () {
          var r = [];

          result.forEach(function (resultI) {
            r.push(uselessScrollHeight + resultI * this$1.itemHeight * -1);
          });

          return r
        })();
        // 计算动画总时长
        var duration = this.duration + (this.colNum - 1) * this.interval + 20;

        // 重置之前的动画影响
        this.reset();

        // 等待 DOM 重绘后开始动画
        setTimeout(function () {
          // 正式赋值，开始动画
          this$1.scrollHResult = scrollHResult;

          // 等待动画结束，发出事件
          this$1.startTimer = setTimeout(function () {
            this$1.$emit('complete', result);
            this$1.startIng = false;
          }, duration);
        }, 20);
      },

      /**
       *  重置
       **/
      reset: function reset () {
        var this$1 = this;

        clearTimeout(this.startTimer);
        this.startTimer = null;
        this.startIng = false;
        this.resetIng = true;

        var arr = [];

        for (var i = 0; i < this.colNum; i++) {
          arr.push(0);
        }

        this.scrollHResult = arr;

        setTimeout(function () {
          this$1.resetIng = false;
        }, 20);
      }
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      var options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      var hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              var originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              var existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  var isOldIE = typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
      return function (id, style) { return addStyle(id, style); };
  }
  var HEAD;
  var styles = {};
  function addStyle(id, css) {
      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
      if (!style.ids.has(id)) {
          style.ids.add(id);
          var code = css.source;
          if (css.map) {
              // https://developer.chrome.com/devtools/docs/javascript-debugging
              // this makes source maps inside style tags work properly in Chrome
              code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
              // http://stackoverflow.com/a/26603875
              code +=
                  '\n/*# sourceMappingURL=data:application/json;base64,' +
                      btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                      ' */';
          }
          if (!style.element) {
              style.element = document.createElement('style');
              style.element.type = 'text/css';
              if (css.media)
                  { style.element.setAttribute('media', css.media); }
              if (HEAD === undefined) {
                  HEAD = document.head || document.getElementsByTagName('head')[0];
              }
              HEAD.appendChild(style.element);
          }
          if ('styleSheet' in style.element) {
              style.styles.push(code);
              style.element.styleSheet.cssText = style.styles
                  .filter(Boolean)
                  .join('\n');
          }
          else {
              var index = style.ids.size - 1;
              var textNode = document.createTextNode(code);
              var nodes = style.element.childNodes;
              if (nodes[index])
                  { style.element.removeChild(nodes[index]); }
              if (nodes.length)
                  { style.element.insertBefore(textNode, nodes[index]); }
              else
                  { style.element.appendChild(textNode); }
          }
      }
  }

  /* script */
  var __vue_script__ = script;

  /* template */
  var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"comp-game"},_vm._l((_vm.colNum),function(i){return _c('div',{key:i,staticClass:"comp-game-item",style:({
        backgroundImage: ("url(" + _vm.spriteMap + ")"),
        width: (_vm.width + "px"),
        height: (_vm.itemHeight + "px"),
        backgroundPositionY: ((_vm.scrollHResult[ i - 1 ]) + "px"),
        transition: _vm.resetIng ?
          'none' :
          ("background-position-y " + _vm.duration + "ms ease " + ((i - 1) * _vm.interval) + "ms")
      })})}),0)};
  var __vue_staticRenderFns__ = [];

    /* style */
    var __vue_inject_styles__ = function (inject) {
      if (!inject) { return }
      inject("data-v-01480edb_0", { source: ".comp-game[data-v-01480edb]{display:flex}", map: undefined, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__ = "data-v-01480edb";
    /* module identifier */
    var __vue_module_identifier__ = undefined;
    /* functional template */
    var __vue_is_functional_template__ = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__ = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      createInjector,
      undefined,
      undefined
    );

  var plugin = {
    install: function install (Vue) {
      Vue.component('vue-slot-machine', __vue_component__);
    }
  };

  if (window && window.Vue) {
    plugin.install(window.Vue);
  }

  return plugin;

}());
