import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import 'animate.css'

// style
import '@/style/main.scss'

// svg
import '@/icons'

// 引入通用组件
import '@/components'

// api
import api from '@/api'
Vue.prototype.api = api

// base
import base from '@/utils/base'

Vue.config.productionTip = false

Vue.use(base)
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
