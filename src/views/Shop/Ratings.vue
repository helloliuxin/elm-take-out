<template>
  <div class="rating-view">
    <div class="seller-rating">
      <div class="seller-score">
        <h3 class="score">{{seller.score}}</h3>
        <p class="title">综合评分</p>
        <div class="rank">高于周边商家{{seller.rankRate}}%</div>
      </div>
      <ul class="rating-desc">
        <li class="rating-item">
          <span class="title">服务态度</span>
          <Star :score="seller.serviceScore" size="36" />
          <span class="score">{{seller.serviceScore}}</span>
        </li>
        <li class="rating-item">
          <span class="title">商品质量</span>
          <Star :score="seller.foodScore" size="36" />
          <span class="score">{{seller.foodScore}}</span>
        </li>
        <li class="rating-item">
          <span class="title">送达时间</span>
          <span class="score text">{{seller.deliveryTime}}分钟</span>
        </li>
      </ul>
    </div>
    <WhiteSpace />
    <div class="rating-control-wrapper">
      <RatingControl
        :filterType="filterType"
        :onlyContent="onlyContent"
        :ratingCount="ratingCount"
        @setFilter="setFilterType"
        @toggleContent="toggleOnlyContent"
      />
    </div>
    <div class="rating-wrapper">
      <RatingCell v-for="(r,i) in showRatings" :rating="r" :key="i" />
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import Star from "../../components/Star";
import WhiteSpace from "../../components/WhiteSpace";
import RatingControl from "@/components/RatingControl";
import RatingCell from "@/components/RatingCell";

export default {
  name: "Ratings",
  props: {
    seller: Object
  },
  data: () => ({
    filterType: 0,
    onlyContent: true,
  }),
  computed: {
    ...mapState({
      ratings: state => state.data.ratings,
    }),
    ratingCount() {
      let all = this.ratings.length;
      let negative = 0;
      let positive = 0;
      for (let i = 0; i < all; i++) {
        let r = this.ratings[i];
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
      return this.ratings.filter(item => {
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
  },
  components: {
    Star,
    WhiteSpace,
    RatingControl,
    RatingCell
  }
};
</script>

<style lang="scss" scoped>
.seller-rating {
  display: flex;
  padding: 18px 0;

  .seller-score {
    flex: 0 0 138px;
    border-right: 1px solid rgba(7, 17, 27, 0.1);
    text-align: center;

    .score {
      margin-bottom: 6px;
      line-height: 28px;
      font-size: 24px;
      color: rgb(255, 153, 0);
    }

    .title {
      margin-bottom: 8px;
      line-height: 12px;
      font-size: 12px;
      color: rgb(7, 17, 27);
    }

    .rank {
      margin-bottom: 6px;
      line-height: 10px;
      font-size: 10px;
      color: rgb(147, 153, 159);
    }
  }

  .rating-desc {
    flex: 1;
    padding: 0 24px;

    .rating-item {
      margin-bottom: 0px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .title {
      margin-right: 12px;
      font-size: 12px;
      line-height: 16px;
      color: rgb(7, 17, 27);
      vertical-align: top;
    }

    .score {
      margin-left: 12px;
      font-size: 12px;
      line-height: 16px;
      color: rgb(255, 153, 0);
      vertical-align: top;
    }

    .text {
      margin-left: 0;
      color: rgb(147, 153, 159);
    }
  }
}

.rating-control-wrapper {
  padding: 0 18px;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}

.rating-wrapper {
  padding: 0 18px;
}

.star {
  vertical-align: top;
}
</style>