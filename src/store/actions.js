import * as types from './mutation-types'

export default {
  async getDataFromServer({ commit }, axios) {
    commit(types.SET_ISLOADING, true) // 发起网络请求，修改请求状态为true

    let seller = await axios('api/seller');
    seller = seller.data.data;
    console.log('seller ==> ', seller);
    commit(types.RECEIVE_SELLER_DATA, seller);

    let goods = await axios('api/goods');
    goods = goods.data.data;
    console.log('goods ==> ', goods);

    let ratings = await axios('api/ratings');
    ratings = ratings.data.data;
    console.log('ratings ==> ', ratings);

    // 请求完毕后，修改请求状态为false
    setTimeout(() => {
      commit(types.RECEIVE_GOODS_DATA, goods);
      commit(types.RECEIVE_RATINGS_DATA, ratings);
      commit(types.SET_ISLOADING, false);
    }, 1000)
  }
}