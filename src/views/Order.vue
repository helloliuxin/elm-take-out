<template>
  <div>
    <k-header title="订单列表"></k-header>
    <div class="order-box">
      <div class="img-box" v-if="!username">
        <img src="/images/person.png" alt="图片加载失败" />
        <p>登录后查看外卖订单</p>
        <div class="goLogin" @click="goLogin">立即登录</div>
      </div>
      <div class="order" v-else>
        <div class="order-header">我的订单</div>
        <div class="order-list">
          <div class="order-card" v-for="(item,index) in orderData" :key="index">
            <div class="order-top">
              <div class="order-avatar">
                <img class="auto-img" :src="item.avatar" alt="加载失败" />
              </div>
              <div class="top-right">
                <div class="name">
                  <span class="shop-name ellipsis">{{item.name}}</span>
                  <span class="cubeic-arrow"></span>
                  <i class="cubeic-delete fr"></i>
                </div>
                <div class="date">{{item.date | getTemplateTimeString}}</div>
              </div>
            </div>
            <div class="order-detail">
              <p v-for="(food,j) in item.foods" :key="j">
                <span class="food-name ellipsis">{{food.name}}</span>
                <span class="price fr">￥{{food.price}}</span>
                <span class="count fr">×{{food.count}}</span>
              </p>
              <p>
                <span class="description">{{item.description}}</span>
                <span class="peisong-price fr">￥{{item.deliveryPrice}}</span>
              </p>
              <p class="p-price">
                实付
                <span class="total-price">￥{{item.totalPrice}}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getTemplateTimeString } from "../assets/js/tool";

export default {
  computed: {
    ...mapState(["username"])
  },
  data() {
    return {
      orderData: []
    };
  },
  created() {
    this.orderData =
      JSON.parse(localStorage.getItem("orderData")).filter(
        f => f.username == this.username
      ) || [];
  },
  filters: {
    getTemplateTimeString(time, template) {
      return getTemplateTimeString(time, template);
    }
  },
  methods: {
    goLogin() {
      this.$router.push({
        path: "/login",
        query: { redirect: this.$router.currentRoute.path }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.order-box {
  width: 100%;
  height: calc(100vh - 94px);
  margin-top: 44px;

  .img-box {
    height: 100%;

    img {
      margin: 0 auto;
      display: block;
      padding-top: 50px;
    }

    p {
      text-align: center;
      font-size: 18px;
      margin: 10px 0;
      color: #5e5d5d;
    }

    .goLogin {
      margin: 0 auto;
      width: 130px;
      text-align: center;
      font-size: 20px;
      line-height: 45px;
      background: #02a774;
      color: white;
      border-radius: 5px;
    }
  }

  .order {
    width: 100%;
    height: 100%;
    background: #f7f7f7;
  }
}

.order-header {
  padding: 10px;
  font-weight: bold;
  font-size: 20px;
}

.order-list {
  margin-bottom: 50px;
  background: #f7f7f7;
}

.order-card {
  margin: 10px;
  border-radius: 8px;
  background: #fff;

  .order-top {
    padding: 10px;
    display: flex;

    .order-avatar {
      width: 50px;
      height: 50px;
      border-radius: 5px;
      overflow: hidden;
    }
  }

  .top-right {
    font-size: 16px;
    margin-left: 5px;
    flex: 1;

    .name {
      height: 25px;
      line-height: 25px;
      font-weight: bold;

      .shop-name {
        display: inline-block;
        max-width: 195px;
      }

      .cubeic-arrow {
        vertical-align: top;
        margin-left: 5px;
      }
    }

    .date {
      line-height: 25px;
      color: #818181;
      padding-bottom: 15px;
      border-bottom: 1px solid #ccc;
    }
  }

  .order-detail {
    padding: 0 10px 10px 65px;
    font-size: 14px;

    .food-name {
      display: inline-block;
      width: 150px;
      overflow: hidden;
    }

    .count {
      margin-right: 40px;
    }

    .p-price {
      text-align: right;
      margin-top: 5px;
    }

    .total-price {
      font-size: 20px;
      color: #17a9f4;
    }
  }
}
</style>