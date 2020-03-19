export default {
  getGoodsFromSellerId: state => {
    return (id) => state.data.seller.find(f => f.sellerId === id);
  }
}