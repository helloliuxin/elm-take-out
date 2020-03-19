<template>
  <div class="seller-view">
    <div class="seller-container">
      <div class="info-overview border-1px">
        <h2 class="banner-name">{{seller.name}}</h2>
        <div class="info-rank">
          <Star :score="seller.score" size="36"></Star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <div class="favorite">
          <i class="icon-favorite icon" :class="{active:favorite}" @click="favorite = !favorite"></i>
          <div class="status">{{favorite ? '已收藏':'未收藏'}}</div>
        </div>
      </div>
      <ul class="remark">
        <li class="block">
          <h3 class="title">起送价</h3>
          <div class="content">
            <span class="stress">{{seller.minPrice}}</span>元
          </div>
        </li>
        <li class="block">
          <h3 class="title">商家配送</h3>
          <div class="content">
            <span class="stress">{{seller.deliveryPrice}}</span>元
          </div>
        </li>
        <li class="block">
          <h3 class="title">平均配送时间</h3>
          <div class="content">
            <span class="stress">{{seller.deliveryTime}}</span>分钟
          </div>
        </li>
      </ul>
    </div>
    <WhiteSpace />
    <div class="seller-container">
      <h2 class="banner-name">公告与活动</h2>
      <p class="seller-bulletin">{{seller.bulletin}}</p>
      <ul>
        <li v-for="(item,index) in seller.supports" :key="index" class="seller-supports">
          <span class="icon" :class="classMap[item.type]"></span>
          <span class="text">{{item.description}}</span>
        </li>
      </ul>
    </div>
    <WhiteSpace />
    <div class="seller-container">
      <h2 class="banner-name">商家实景</h2>
      <div class="seller-slider" ref="sellerSlider">
        <cube-scroll
          ref="scroll"
          :data="seller.pics"
          direction="horizontal"
          class="horizontal-scroll-list-wrap"
        >
          <ul :style="{width: imgBoxWidth + 'px'}" class="list-wrapper">
            <li v-for="(pic,index) in seller.pics" :key="index" class="seller-pic">
              <img :src="pic" class="auto-img" />
            </li>
          </ul>
        </cube-scroll>
      </div>
    </div>
    <WhiteSpace />
    <div class="seller-container">
      <h2 class="banner-name">商家信息</h2>
      <ul class="seller-infos">
        <li v-for="(info,index) in seller.infos" :key="index" class="seller-supports">
          <span class="text">{{info}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Star from "../../components/Star";
import WhiteSpace from "../../components/WhiteSpace";

export default {
  name: "Seller",
  props: {
    seller: Object,
    classMap: Array
  },
  data() {
    return {
      imgBoxWidth: 0,
      favorite: false
    };
  },
  methods: {
    widthComputed() {
      this.imgBoxWidth = this.seller.pics.length * 126;
    }
  },
  created() {
    this.widthComputed();
  },

  components: {
    Star,
    WhiteSpace
  }
};
</script>

<style lang="scss">
@import "../../assets/scss/mixin.scss";

.seller-container {
  padding: 18px 18px 0;
  background: #fff;

  .banner-name {
    font-size: 14px;
    line-height: 14px;
    color: rgb(7, 17, 27);
  }

  .info-overview {
    position: relative;
    padding-bottom: 18px;
    @include scale-border-bottom(rgba(7, 17, 27, 0.1));

    .info-rank {
      margin-top: 8px;
      line-height: 16px;
    }

    .text {
      margin: 0 12px 0 8px;
      font-size: 10px;
      line-height: 16px;
      color: rgb(77, 85, 93);
      vertical-align: middle;

      &:last-child {
        margin: 0;
      }
    }

    .favorite {
      position: absolute;
      right: 0;
      bottom: 22px;
      width: 36px;
      text-align: center;
    }

    .icon {
      display: inline-block;
      margin-bottom: 5px;
      font-size: 24px;
      line-height: 24px;
      color: rgb(77, 85, 93);

      &.active {
        color: rgb(240, 20, 20);
      }
    }

    .status {
      font-size: 10px;
      line-height: 10px;
      color: rgb(77, 85, 93);
    }
  }

  .remark {
    display: flex;
    padding: 18px 0;

    .block {
      flex: 1;
      text-align: center;
      border-right: 1px solid rgba(7, 17, 27, 0.1);

      &:last-child {
        border-right: 0;
      }
    }

    .title {
      margin-bottom: 4px;
      font-size: 10px;
      line-height: 10px;
      color: rgb(147, 153, 159);
    }

    .content {
      font-size: 10px;
      line-height: 24px;
      font-weight: 200;
      color: rgb(7, 17, 27);
    }

    .stress {
      font-size: 24px;
    }
  }

  .seller-bulletin {
    margin: 8px 0 16px;
    padding: 0 12px;
    font-size: 12px;
    line-height: 24px;
    font-weight: 200;
    color: rgb(240, 20, 20);
  }

  .seller-supports {
    padding: 16px 12px;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    font-size: 0;

    .icon {
      margin-right: 6px;
      display: inline-block;
      width: 16px;
      height: 16px;
      @include supports-icon(4, 16px 16px);
    }

    .text {
      font-size: 12px;
      line-height: 16px;
      color: rgb(7, 17, 27);
      vertical-align: top;
    }
  }

  .seller-slider {
    margin: 12px 0 18px;
    height: 90px;
    width: 100%;
    overflow: hidden;

    ul {
      white-space: nowrap;
    }

    .seller-pic {
      display: inline-block;
      width: 120px;
      height: 90px;
      margin-right: 6px;
    }
  }

  .seller-infos {
    margin-top: 12px;
  }
}

.star {
  height: 16px;
  line-height: 16px;
}

.horizontal-scroll-list-wrap {
  // border: 1px solid rgba(0, 0, 0, 0.1);

  .list-wrapper {
    white-space: nowrap;
  }

  .cube-scroll-content {
    display: inline-block;
  }
}
</style>