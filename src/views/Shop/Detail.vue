<template>
  <div class="goods-detail">
    <div class="image-wrapper">
      <img :src="food.image" class="auto-img" :alt="food.name" />
      <span class="icon-arrow_lift back" @click="goBack"></span>
    </div>

    <div class="detail-wrapper">
      <h2 class="name">{{food.name}}</h2>
      <p class="desc">
        月售{{food.sellCount}}份
        <span class="rating">好评率{{food.rating}}%</span>
      </p>
      <div class="detail-buy">
        <div class="detail-price">
          ¥{{food.price}}
          <span class="old" v-if="food.oldPrice">¥{{food.oldPrice}}</span>
        </div>
        <div class="detail-right">
          <span class="buy-btn">加入购物车</span>
        </div>
      </div>
    </div>
    <white-space />

    <div v-if="food.info">
      <div class="detail-wrapper">
        <h3 class="title">商品介绍</h3>
        <p class="info">{{food.info}}</p>
      </div>
      <white-space />
    </div>

    <div class="detail-wrapper">
      <h3 class="title" style="margin-bottom: 0">商品评价</h3>
      <rating-control
        :filterType="filterType"
        :onlyContent="onlyContent"
        :ratingCount="ratingCount"
        @setFilter="setFilterType"
        @toggleContent="toggleOnlyContent"
      />
    </div>

    <div class="rating-wrapper">
      <div class="rating-item border-1px" v-for="(r,i) in showRatings" :key="i">
        <div class="time">{{r.rateTime | getTemplateTimeString}}</div>
        <p>
          <i class="icon" :class="r.rateType === 0?'icon-thumb_up':'icon-thumb_down'"></i>
          <span class="text">{{r.text}}</span>
        </p>
        <div class="user">
          <span>{{r.username}}</span>
          <img class="avatar" :src="r.avatar" alt="用户头像" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WhiteSpace from "../../components/WhiteSpace";
import RatingControl from "../../components/RatingControl";
import { getTemplateTimeString } from "../../assets/js/tool";

export default {
  name: "Detail",
  props: {
    food: Object
  },
  data: () => ({
    filterType: 0,
    onlyContent: false
  }),
  computed: {
    ratingCount() {
      let all = this.food.ratings.length;
      let negative = 0;
      let positive = 0;
      for (let i = 0; i < all; i++) {
        let r = this.food.ratings[i];
        if (r.rateType === 0) {
          //好评
          positive++;
        } else {
          negative++;
        }
      }
      return { all, positive, negative };
    },
    showRatings() {
      return this.food.ratings.filter(item => {
        // 判断是否只看有内容的评价
        if (this.onlyContent && !item.text) {
          return false;
        }

        if (this.filterType === 1) {
          // 好评
          return item.rateType === 0;
        }

        if (this.filterType === 2) {
          //差评
          return item.rateType === 1;
        }

        return true;
      });
    }
  },
  methods: {
    setFilterType(type) {
      this.filterType = type;
    },
    toggleOnlyContent() {
      this.onlyContent = !this.onlyContent;
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  filters: {
    getTemplateTimeString(time, template) {
      return getTemplateTimeString(time, template);
    }
  },
  components: {
    WhiteSpace,
    RatingControl
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/mixin.scss";

.goods-detail {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 48px;
  background: #fff;
  overflow: auto;

  .image-wrapper {
    position: relative;
    width: 100%;
    height: 375px;

    .back {
      position: absolute;
      left: 10px;
      top: 10px;
      display: inline-block;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      font-size: 12px;
      line-height: 30px;
      text-align: center;
      color: #fff;
      background: rgba(7, 17, 27, 0.5);
    }
  }

  .detail-wrapper {
    padding: 18px;

    .title {
      margin-bottom: 12px;
      font-size: 14px;
      font-weight: 400;
      line-height: 14px;
      color: rgb(7, 17, 27);
    }
  }

  .name {
    margin-bottom: 8px;
    line-height: 14px;
    font-size: 14px;
    font-weight: 700;
    color: rgb(7, 17, 27);
  }

  .desc {
    margin-bottom: 18px;
    line-height: 10px;
    font-size: 10px;
    color: rgb(147, 153, 159);

    .rating {
      margin-left: 12px;
    }
  }

  .detail-buy {
    display: flex;
    height: 24px;

    .detail-price {
      flex: 1;
      font-size: 14px;
      font-weight: 700;
      line-height: 24px;
      color: rgb(240, 20, 20);
    }

    .old {
      font-size: 10px;
      text-decoration: line-through;
      color: rgb(147, 153, 159);
    }

    .detail-right {
      flex: 0 0 74px;
    }

    .buy-btn {
      display: inline-block;
      padding: 6px 0;
      width: 100%;
      height: 100%;
      border-radius: 12px;
      font-size: 10px;
      line-height: 12px;
      text-align: center;
      color: #fff;
      background: rgb(0, 160, 220);
    }
  }

  .info {
    padding: 0 8px;
    font-size: 12px;
    font-weight: 200;
    color: rgb(77, 85, 93);
    line-height: 24px;
  }

  .rating-wrapper {
    padding: 0 18px;
    border-top: 1px solid rgba(7, 17, 27, 0.1);

    .rating-item {
      position: relative;
      padding: 16px 0;
      @include scale-border-bottom(rgba(7, 17, 27, 0.1));
    }

    .time {
      font-size: 10px;
      line-height: 12px;
      color: rgb(147, 153, 159);
      margin-bottom: 6px;
    }

    .icon {
      font-size: 12px;
      line-height: 24px;

      &.icon-thumb_up {
        color: rgb(0, 160, 220);
      }

      &.icon-thumb_down {
        color: rgb(147, 153, 159);
      }
    }

    .text {
      margin-left: 4px;
      font-size: 12px;
      line-height: 16px;
      color: rgb(7, 17, 27);
    }

    .user {
      position: absolute;
      right: 0;
      top: 18px;
      font-size: 0;

      span {
        font-size: 10px;
        line-height: 12px;
        color: rgb(147, 153, 159);
        vertical-align: top;
      }

      .avatar {
        margin-left: 6px;
        width: 14px;
        height: 14px;
        border-radius: 50%;
      }
    }
  }
}
</style>