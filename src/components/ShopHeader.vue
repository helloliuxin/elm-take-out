<template>
  <div class="seller-header">
    <div class="content-wrapper">
      <div class="avatar">
        <img class="auto-img" :src="seller.avatar" />
      </div>
      <div class="content">
        <div class="icon-close goback" @click="goback"></div>
        <h2 class="title ellipsis">
          <span class="brand"></span>
          <span class="title-text">{{seller.name}}</span>
        </h2>
        <div class="desc">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <ul class="supports-carousel">
          <transition-group name="scroll">
            <li
              class="supports-item"
              v-for="(item,index) in seller.supports"
              v-show="index === currentIndex"
              :key="item.type"
            >
              <span class="support-icon" :class="classMap[item.type]"></span>
              <span class="supports-desc">{{item.description}}</span>
            </li>
          </transition-group>
        </ul>
      </div>
      <div class="count" @click="showDetailFnc" v-if="seller.supports&&seller.supports.length">
        {{seller.supports.length}}个
        <i class="icon-keyboard_arrow_right arrow"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetailFnc">
      <span class="bulletin-icon"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right arrow"></i>
    </div>

    <transition name="fade">
      <div class="discount-detail" v-show="showDetail">
        <div class="detail-wrapper">
          <h2 class="detail-name">{{seller.name}}</h2>
          <div class="star-wrapper">
            <Star :score="seller.score" size="48"></Star>
          </div>
          <div class="detail-title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul class="detail-supports">
            <li class="supports-item" v-for="(item,index) in seller.supports" :key="index">
              <span class="supports-icon" :class="classMap[item.type]"></span>
              <span class="supports-text">{{item.description}}</span>
            </li>
          </ul>

          <div class="detail-title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>

          <div class="detail-bulletin">{{seller.bulletin}}</div>
        </div>
        <div class="detail-close">
          <i class="icon-close close" @click="closeDetailFnc"></i>
        </div>
      </div>
    </transition>

    <div class="seller-background">
      <img :src="seller.avatar" width="100%" height="250%" />
    </div>
  </div>
</template>

<script>
import Star from "./Star";

export default {
  name: "SellerHeader",
  props: {
    seller: Object,
    classMap: Array
  },
  data() {
    return {
      currentIndex: 0,
      showDetail: false
    };
  },
  methods: {
    showDetailFnc() {
      this.showDetail = true;
    },
    closeDetailFnc() {
      this.showDetail = false;
    },
    goback() {
      const redirect = this.$route.query.redirect || "/";
      this.$router.push(redirect);
    }
  },
  mounted() {
    clearInterval(this.timer);
    this.$nextTick(() => {
      // 数据更新重新渲染页面完毕
      this.timer = setInterval(() => {
        // 开始轮播
        this.currentIndex++;
        if (this.currentIndex >= this.seller.supports.length) {
          this.currentIndex = 0;
        }
      }, 1000);
    });
  },
  components: {
    Star
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/mixin";

.seller-header {
  position: relative;
  color: #fff;
  font-size: 0; // 把页面中元素与元素之间的空格回车
  overflow: hidden;
  background-color: rgba(7, 17, 27, 0.5);
}

.content-wrapper {
  position: relative;
  display: flex;
  padding: 24px 12px 18px 24px;

  .avatar {
    flex: 0 0 64px;
    margin-right: 16px;
    width: 64px;
    height: 64px;
  }

  .content {
    flex: 1;

    .goback {
      float: right;
      width: 30px;
      height: 25px;
      margin-right: 7px;
      background: url(/images/back.png) no-repeat;
      background-position: center;
      background-size: contain;
    }

    .title {
      margin-top: 2px;
      width: 200px;
    }

    .brand {
      display: inline-block;
      margin-right: 6px;
      width: 30px;
      height: 18px;
      @include bg-img(brand, 30px 18px);
    }

    .title-text {
      font-size: 16px;
      font-weight: bold;
      line-height: 18px;
      vertical-align: top;
    }

    .desc {
      margin-top: 8px;
      font-size: 12px;
      line-height: 12px;
      font-weight: 200;
    }

    .supports-carousel {
      position: relative;
      margin: 10px 0 2px;
      height: 12px;
      width: 100%;
      overflow: hidden;
    }

    .supports-item {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
    }

    /*使用元素进入离开过渡实现无缝轮播*/
    .scroll-enter {
      transform: translateY(16px);
    }

    .scroll-enter-active,
    .scroll-leave-active {
      transition: all 0.5s linear;
    }

    .scroll-enter-to,
    .scroll-leave {
      transform: translateY(0);
    }

    .scroll-leave-to {
      transform: translateY(-16px);
    }

    .support-icon {
      display: inline-block;
      margin-right: 4px;
      width: 12px;
      height: 12px;
      @include supports-icon(1, 12px 12px);
    }

    .supports-desc {
      font-size: 10px;
      font-weight: 200;
      line-height: 12px;
      vertical-align: top;
    }
  }

  .count {
    position: absolute;
    right: 12px;
    bottom: 18px;
    padding: 0 8px;
    height: 24px;
    border-radius: 12px;
    font-size: 10px;
    line-height: 24px;
    background: rgba(0, 0, 0, 0.2);

    .arrow {
      position: relative;
      top: 1px;
    }
  }
}

.bulletin-wrapper {
  position: relative;
  padding: 0 18px 0 12px;
  height: 28px;
  line-height: 28px;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: rgba(7, 17, 27, 0.2);
  font-size: 10px;

  .bulletin-icon {
    display: inline-block;
    margin: 8px 4px 0 0;
    width: 22px;
    height: 12px;
    @include bg-img(bulletin, 22px 12px);
  }

  .bulletin-text {
    vertical-align: top;
  }

  .arrow {
    display: inline-block;
    position: absolute;
    top: 8px;
    right: 12px;
    font-size: 10px;
  }
}

.seller-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  filter: blur(5px);
}

.discount-detail {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background: rgba(7, 17, 27, 0.8);
  backdrop-filter: blur(5px); // 毛玻璃效果
  overflow: auto;

  .detail-wrapper {
    width: 100%;
    min-height: 100%;
    padding: 64px 36px;

    .detail-name {
      font-size: 16px;
      line-height: 16px;
      font-weight: 700;
      text-align: center;
    }

    .star-wrapper {
      margin-top: 16px;
      text-align: center;
      height: 24px;
    }

    .detail-title {
      display: flex;
      margin: 28px 0 24px;

      .line {
        flex: 1;
        position: relative;
        top: -6px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      }

      .text {
        margin: 0 12px;
        font-size: 14px;
        line-height: 14px;
        font-weight: 700;
      }
    }

    .detail-bulletin {
      padding: 0 12px;
      font-size: 12px;
      line-height: 24px;
      font-weight: 200;
    }
  }

  .detail-supports {
    padding: 0 12px;

    .supports-item {
      margin-bottom: 12px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .supports-icon {
      display: inline-block;
      margin-right: 6px;
      width: 16px;
      height: 16px;
      @include supports-icon(2, 16px 16px);
    }

    .supports-text {
      font-size: 12px;
      line-height: 14px;
      font-weight: 200;
      vertical-align: top;
    }
  }

  .detail-close {
    margin-top: -64px;
    text-align: center;

    .close {
      font-size: 32px;
      color: rgba(255, 255, 255, 0.5);
    }
  }
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s linear;
}

.fade-enter-to,
.fade-leave {
  opacity: 1;
}
</style>