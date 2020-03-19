import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'amfe-flexible'
import KHeader from './components/Header.vue'

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

// 从全局引入Header.vue
Vue.component('k-header', KHeader)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 开启程序时获取数据
store.dispatch('getDataFromServer', axios)
