<template>
  <div>
    <!-- 商家列表 -->
    <div class="shop-container">
      <ul class="shop-list">
        <li
          class="shop-li border-1px"
          v-for="(item,index) in seller"
          :key="index"
          @click="goShop(item.sellerId)"
        >
          <div class="li-card">
            <div class="shop-left">
              <img class="auto-img" :src="item.avatar" alt="加载失败" />
            </div>
            <div class="shop-right">
              <section class="shop-detail-header">
                <h4 class="shop-title ellipsis">
                  <span class="pingpai">品牌</span>
                  {{item.name}}
                </h4>
                <ul class="shop-detail-ul">
                  <li class="supports">保</li>
                  <li class="supports">准</li>
                  <li class="supports">票</li>
                </ul>
              </section>
              <section class="shop-rating-order">
                <section class="shop-rating-order-left">
                  <div class="star star-24"></div>
                  <star :score="item.score" size="24"></star>
                  <div class="rating-section">{{item.score}}</div>
                  <div class="order-section">月售{{item.sellCount}}单</div>
                </section>
                <section class="shop-rating-order-right">
                  <span class="delivery-style delivery-right">{{item.description}}</span>
                </section>
              </section>
              <section class="shop-distance">
                <p class="shop-delivery-msg">
                  <span>￥{{item.minPrice}}起送</span>
                  <span class="sefmentation">/</span>
                  <span>配送费约￥{{item.deliveryPrice}}元</span>
                </p>
              </section>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import { mapState } from "vuex";
import Star from "./Star";

export default {
  name: "ShopList",
  // computed: {
  //   ...mapState({
  //     seller: state => state.data.seller
  //   })
  // },
  props: {
    seller: {
      type: Array,
    }
  },
  methods: {
    goShop(id) {
      this.$router.push({ path: "/shop", query: { id: id , redirect: this.$router.currentRoute.path} });
    }
  },
  components: {
    Star
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/index.scss";

.shop-container {
  margin-bottom: 50px;
}

.shop-li {
  position: relative;
  border: none;
  width: 100%;
}

.shop-li:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background-color: #f1f1f1;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}

section {
  overflow: hidden;
}

.li-card {
  padding: 15px 8px;
  width: 100%;
  overflow: hidden;

  .shop-left {
    float: left;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 23%;
    height: 75px;
    padding-right: 10px;
  }

  .shop-right {
    float: right;
    width: 77%;

    .shop-title {
      float: left;
      width: 200px;
      color: #333;
      font-size: 16px;
      line-height: 16px;
      font-weight: 700;
    }

    .pingpai {
      display: inline-block;
      font-size: 11px;
      line-height: 11px;
      color: #333;
      background-color: #ffd930;
      padding: 2px 2px;
      border-radius: 2px;
      margin-right: 5px;
      font-weight: 600;
      vertical-align: top;
    }

    .shop-detail-ul {
      float: right;
      margin-top: 3px;

      .supports {
        float: left;
        font-size: 10px;
        color: #999;
        border: 1px solid #f1f1f1;
        padding: 0 2px;
        border-radius: 2px;
      }
    }

    .shop-rating-order {
      width: 100%;
      margin-top: 18px;
      margin-bottom: 8px;

      .shop-rating-order-left {
        float: left;
        color: #ff9a0d;

        .star {
          float: left;
          font-size: 0;
        }

        .rating-section {
          float: left;
          font-size: 10px;
          color: #ff6000;
          margin-left: 4px;
        }

        .order-section {
          float: left;
          font-size: 10px;
          color: #666;
          -webkit-transform: scale(0.8);
          transform: scale(0.8);
        }
      }

      .shop-rating-order-right {
        float: right;
        font-size: 0;

        .delivery-right {
          color: #02a774;
          border: 1px solid #02a774;
        }

        .delivery-style {
          -webkit-transform-origin: 35px 0;
          transform-origin: 35px 0;
          -webkit-transform: scale(0.7);
          transform: scale(0.7);
          display: inline-block;
          font-size: 12px;
          padding: 1px;
          border-radius: 2px;
        }
      }
    }

    .shop-distance {
      width: 100%;
      font-size: 12px;

      .shop-delivery-msg {
        float: left;
        -webkit-transform-origin: 0;
        transform-origin: 0;
        -webkit-transform: scale(0.9);
        transform: scale(0.9);
        color: #666;
      }

      .segmentation {
        color: #ccc;
      }
    }
  }
}
</style>