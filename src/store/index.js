import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    username: '', // 登录账号用户名
    data: {
      seller: [], // 商家数据
      goods: [], // 商品
      ratings: [] // 评价数据
    },
    isLoading: false, // 数据加载状态

  },
  mutations,
  actions,
  getters,
  
})
