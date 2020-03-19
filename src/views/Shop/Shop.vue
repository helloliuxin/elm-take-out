<template>
  <div>
    <shop-header :classMap="classMap" :seller="getGoods"></shop-header>

    <!-- 选项卡-->
    <cube-tab-bar v-model="selectLabel" @change="changeHandler">
      <cube-tab v-for="(item, index) in tabs" :key="index" :label="item.value">
        <span class="tab-text">{{item.label}}</span>
      </cube-tab>
    </cube-tab-bar>

    <router-view :classMap="classMap" :seller="getGoods"></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ShopHeader from "../../components/ShopHeader";

export default {
  data() {
    return {
      sellerId: "",
      classMap: ["decrease", "discount", "special", "invoice", "guarantee"],
      // tab-bar
      selectLabel: "/shop/goods", // 默认页签
      tabs: [
        { label: "商品", value: "/shop/goods" },
        { label: "评价", value: "/shop/ratings" },
        { label: "商家", value: "/shop/info" }
      ]
    };
  },
  created() {
    console.log(this.$route.query.id);
    this.sellerId = this.$route.query.id;
    // 初始化页签设置
    this.selectLabel = this.$route.path;
  },
  // updated() {
  //   this.sellerId = this.$route.query.id;
  // },
  watch: {
    // 路由发生变化时, 同步tabs选中
    $route(route) {
      this.selectLabel = route.path;
    }
  },
  computed: {
    ...mapGetters(["getGoodsFromSellerId"]),
    getGoods() {
      let id = this.sellerId;
      return this.getGoodsFromSellerId(id);
    }
  },
  methods: {
    changeHandler(val) {
      this.$router.push(val);
    }
  },
  components: {
    ShopHeader
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/index.scss";

.cube-tab-bar {
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);

  .cube-tab {
    font-size: 14px;
    color: rgb(77, 85, 93);
  }

  .cube-tab_active {
    color: rgb(240, 20, 20);
  }
}
</style>