<template>
  <div id="app">
    <router-view />

    <cube-tab-bar v-model="selectLabel" @change="changeHandler" v-show="$route.meta.showTabBar">
      <cube-tab v-for="(item, index) in tabs" :key="index" :label="item.value">
        <div class="tab-div" :class="item.icon"></div>
        <span class="tab-text">{{item.label}}</span>
      </cube-tab>
    </cube-tab-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      publicPath: process.env.BASE_URL,
      selectLabel: "/", // 默认页签
      tabs: [
        { label: "主页", value: "/", icon: "cubeic-home" },
        { label: "搜索", value: "/search", icon: "cubeic-search" },
        { label: "订单", value: "/order", icon: "cubeic-mall" },
        { label: "我的", value: "/mine", icon: "cubeic-person" }
      ]
    };
  },
  watch: {
    // 路由发生变化时, 同步tabs选中
    $route(route) {
      if (route.meta.showTabBar) {
        this.selectLabel = route.path;
      }
    }
  },
  created() {
    // 初始化页签设置
    this.selectLabel = this.$route.path;
  },
  methods: {
    changeHandler(val) {
      if (this.$route.meta.showTabBar) {
        this.$router.push(val);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./assets/scss/index.scss";
@import "./assets/scss/font.css";

.cube-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  height: 50px;
  border-top: 1px solid #ccc;
  z-index: 999;
}

.cube-tab_active {
  color: #02a774;
}

.cube-tab {
  padding: 0;
}

.tab-div {
  position: relative;
  top: 5px;
  font-size: 30px;
}

.tab-text {
  font-size: 12px;
  position: relative;
  top: -5px;
}
</style>
