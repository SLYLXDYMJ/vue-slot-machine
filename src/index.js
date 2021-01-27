import VueSlotMachine from './index.vue'

const plugin = {
  install (Vue) {
    Vue.component('vue-slot-machine', VueSlotMachine)
  }
}

if (window && window.Vue) {
  plugin.install(window.Vue)
}

export default plugin
