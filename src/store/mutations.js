import * as types from './mutation-types'

export default {
  [types.SET_TOKEN](state, token) { //修改token
    state.token = token;
  },
  [types.SET_USERNAME](state, username) { // 登录用户名
    state.username = username;
  },
  [types.SET_ISLOADING](state, status) { // 数据加载状态
    state.isLoading = status;
  },
  [types.RECEIVE_SELLER_DATA](state, sellerData) { // 接受商店数据
    state.data.seller = sellerData;
  },
  [types.RECEIVE_GOODS_DATA](state, goodsData) { // 接受商品数据
    state.data.goods = goodsData;
  },
  [types.RECEIVE_RATINGS_DATA](state, ratingsData) { // 接受商店数据
    state.data.ratings = ratingsData;
  },
}