<template>
  <div class="rating-cell border-1px">
    <div class="avatar">
      <img :src="rating.avatar" alt="avatar" class="icon" />
    </div>
    <div class="container">
      <h3 class="user-name">{{rating.username}}</h3>
      <div class="rating-star">
        <Star :score="rating.score" size="24" />
        <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
      </div>
      <p class="rating-text">{{rating.text}}</p>
      <div v-if="rating.recommend.length">
        <span class="icon" :class="rating.rateType == 0? 'icon-thumb_up':'icon-thumb_down'"></span>
        <span class="recommend" v-for="(r,i) in rating.recommend" :key="i">{{r}}</span>
      </div>
      <div class="rating-time">{{rating.rateTime | getTemplateTimeString}}</div>
    </div>
  </div>
</template>

<script>
import Star from "./Star";
import { getTemplateTimeString } from "../assets/js/tool.js";

export default {
  name: "RatingCell",
  props: {
    rating: {
      type: Object,
      required: true
    }
  },
  filters: {
    getTemplateTimeString(time, template) {
      return getTemplateTimeString(time, template);
    }
  },
  components: {
    Star
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/mixin.scss";

.rating-cell {
  display: flex;
  padding: 18px 0;
  @include scale-border-bottom(rgba(7, 17, 27, 0.1));

  .avatar {
    flex: 0 0 28px;
    margin-right: 12px;
    width: 28px;

    .icon {
      width: 28px;
      height: 28px;
      border-radius: 50%;
    }
  }

  .container {
    position: relative;
    flex: 1;
    font-size: 0;

    .user-name {
      margin-bottom: 4px;
      font-size: 10px;
      line-height: 12px;
      color: rgb(7, 17, 27);
    }

    .rating-star {
      margin-bottom: 6px;
    }

    .delivery {
      margin-left: 6px;
      font-size: 10px;
      line-height: 12px;
      font-weight: 200;
      color: rgb(147, 153, 159);
    }

    .rating-text {
      margin-bottom: 8px;
      font-size: 12px;
      line-height: 18px;
      color: rgb(7, 17, 27);
    }

    .icon {
      font-size: 12px;
      line-height: 16px;

      &.icon-thumb_up {
        color: rgb(0, 160, 220);
      }

      &.icon-thumb_down {
        color: rgb(183, 187, 191);
      }
    }

    .recommend {
      display: inline-block;
      margin-left: 8px;
      padding: 0 12px;
      border: 1px solid rgba(7, 17, 27, 0.1);
      border-radius: 1px;
      max-width: 80px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 9px;
      line-height: 16px;
      color: rgb(147, 153, 159);
      vertical-align: top;
    }

    .rating-time {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 10px;
      line-height: 12px;
      color: rgb(147, 153, 159);
    }
  }
}
</style>