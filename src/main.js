// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import { InfiniteScroll, Swipe, SwipeItem } from 'mint-ui'
import '@/components/reset'
// vue-material ui
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import 'mint-ui/lib/style.css'
Vue.use(InfiniteScroll)
Vue.prototype.$http = axios
// mint-ui
Vue.use(VueMaterial)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
// 要用的mint-ui组件
Vue.config.productionTip = false
Vue.material.registerTheme('default', {
  primary: 'blue',
  accent: 'red',
  warn: 'red',
  background: 'grey'
})

Vue.material.registerTheme({
  cyan: {
    primary: 'cyan'
  },
  teal: {
    primary: 'teal'
  },
  black: {
    primary: 'black'
  },
  brown: {
    primary: 'brown'
  },
  purple: {
    primary: 'purple'
  },
  grey: {
    primary: 'grey'
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})