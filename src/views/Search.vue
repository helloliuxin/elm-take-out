<template>
  <div>
    <k-header title="搜索"></k-header>
    <div class="search-wrapper">
      <div class="abc">
        <input type="text" v-model="value" placeholder="请输入商家名称" class="search-input" />
        <i class="cubeic-wrong" v-show="value" @click="clearValue"></i>
      </div>
      <input type="submit" class="search-submit" />
    </div>
    <shop-list :seller="searchSeller"></shop-list>
  </div>
</template>

<script>
import ShopList from "../components/ShopList";
import { mapState } from "vuex";

export default {
  data() {
    return {
      value: "",
      showText: false
    };
  },
  computed: {
    ...mapState({
      seller: state => state.data.seller
    }),
    searchSeller() {
      if (!this.value) {
        return [];
      }
      // 根据用户名称匹配
      return this.seller.filter(item => {
        let reg = new RegExp(this.value, 'img')
        return reg.test(item.name)
      })
    }
  },
  methods: {
    clearValue() {
      this.value = "";
    },
  },
  components: {
    ShopList
  }
};
</script>

<style lang="scss" scoped>
.search-wrapper {
  margin-top: 44px;
  background-color: #fff;
  padding: 12px 8px;

  &::after {
    content: '';
    display: block;
    clear: both;
  }

  .abc {
    position: relative;

    .cubeic-wrong {
      position: absolute;
      top: 7px;
      right: 85px;
      font-size: 20px;
    }
  }

  input {
    height: 35px;
    padding: 0 4px;
    border-radius: 2px;
    font-weight: bold;
    outline: none;
  }

  .search-input {
    float: left;
    width: 79%;
    border: 4px solid #f2f2f2;
    font-size: 14px;
    color: #333;
    background-color: #f2f2f2;
    box-sizing: border-box;
    padding-right: 40px;
  }

  .search-submit {
    float: right;
    width: 18%;
    border: 4px solid #02a774;
    font-size: 16px;
    color: #fff;
    background-color: #02a774;
  }
}

.shop-head {
  display: none;
}
</style>