<template>
  <div class="header">
    <h1>{{title}}</h1>
    <i class="cubeic-search" v-if="$route.path == '/'" @click="goSearch"></i>
    <div class="extend">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  methods: {
    goSearch() {
      this.$router.push('/search');
    }
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  height: 44px;
  line-height: 44px;
  text-align: center;
  background: #02a774;
  color: white;
  font-size: 20px;
  z-index: 999;

  .cubeic-search {
    position: absolute;
    top: 0;
    left: 0;
    padding: 0 15px;
    color: #fff;
    font-size: 24px;
  }

  .extend {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 15px;
    color: #fc915b;
  }
}
</style>