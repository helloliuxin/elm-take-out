<template>
  <div class="home">
    <k-header title="饿了美外卖"></k-header>
    <div class="home-wrapper">
      <cube-scroll ref="scroll">
        <!-- 轮播图 -->
        <cube-slide :data="categorysArr" :interval="5000">
          <cube-slide-item class="img-box" v-for="(items,index) in categorysArr" :key="index">
            <div class="card" v-for="(item,k) in items" :key="k">
              <img class="aimg" :src="item.url" alt="加载失败" />
              <p>{{item.text}}</p>
            </div>
          </cube-slide-item>
        </cube-slide>

        <div class="line"></div>
        <space></space>

        <div class="shop-head">
          <i class="cubeic-hot"></i>
          <span>附近商家</span>
        </div>
        <!-- 商家列表 -->
        <shop-list :seller="seller"></shop-list>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import Space from "../components/Space";
import ShopList from "../components/ShopList";
import { mapState } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      slideData: [
        // 轮播图数据
        { text: "甜品", url: "/images/1.jpg" },
        { text: "商超便利", url: "/images/2.jpg" },
        { text: "美食", url: "/images/3.jpg" },
        { text: "简餐", url: "/images/4.jpg" },
        { text: "新店特惠", url: "/images/5.jpg" },
        { text: "准时达", url: "/images/6.jpg" },
        { text: "预定早餐", url: "/images/7.jpg" },
        { text: "土豪推荐", url: "/images/8.jpg" },
        { text: "川湘菜", url: "/images/9.jpg" },
        { text: "麻辣烫", url: "/images/10.jpg" },
        { text: "包子粥铺", url: "/images/11.jpg" },
        { text: "鲜花蛋糕", url: "/images/12.jpg" },
        { text: "日韩料理", url: "/images/13.jpg" },
        { text: "果蔬生鲜", url: "/images/14.jpg" },
        { text: "汉堡薯条", url: "/images/15.jpg" },
        { text: "披萨意面", url: "/images/16.jpg" }
      ]
    };
  },
  computed: {
    // 根据slideData一维数组生成一个2维数组,小数组中的元素个数最大是8
    categorysArr() {
      const { slideData } = this;
      // 准备空的2维数组
      const arr = [];
      // 准备一个小数组(最大长度为8)
      let minArr = [];
      // 遍历slideData
      slideData.forEach(c => {
        // 如果当前小数组已经满了, 创建一个新的
        if (minArr.length === 8) {
          minArr = [];
        }
        // 如果minArr是空的, 将小数组保存到大数组中
        if (minArr.length === 0) {
          arr.push(minArr);
        }
        // 将当前分类保存到小数组中
        minArr.push(c);
      });

      return arr;
    },
    ...mapState({
      seller: state => state.data.seller
    })
  },
  methods: {},
  components: {
    Space,
    ShopList
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/mixin.scss";

.home-wrapper {
  margin-top: 44px;
  width: 100%;
  height: calc(100vh - 44px);
}

.cube-slide {
  max-height: 176px;

  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 10px;
  }
}

.img-box {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: flex-start;
  -webkit-box-pack: center;

  .card {
    width: 25%;
    margin-bottom: 15px;

    .aimg {
      display: block;
      margin: 0 auto;
      width: 50px;
      height: 60px;
      padding-bottom: 10px;
    }

    p {
      width: 100%;
      text-align: center;
      font-size: 13px;
      color: #666;
    }
  }
}

.space {
  border-bottom: 1px solid #ccc;
  margin-top: 5px;
}

.line {
  @include scale-border-bottom(rgba(7, 17, 27, 0.1));
  top: 8px;
}

.shop-head {
  padding: 10px 10px 0;

  i {
    font-size: 16px;
  }

  span {
    color: #999;
    font-size: 14px;
    line-height: 20px;
    margin-left: 3px;
  }
}
</style>
