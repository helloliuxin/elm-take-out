<template>
  <div>
    <k-header title="我的"></k-header>
    <div class="nav-mine">
      <div class="photo"></div>
      <div class="goLogin" @click="goLogin">
        <div class="nav-right">
          <p class="username" v-if="!username">登录/注册</p>
          <p class="username" v-if="username">{{username}}</p>
          <p>
            <i class="cubeic-mobile-phone"></i>
            <span>暂无手机绑定</span>
          </p>
        </div>
        <div class="cubeic-arrow"></div>
      </div>
    </div>
    <wallet></wallet>
    <space></space>
    <div class="list">
      <div v-for="item in listData" :key="item.id" class="list-item">
        <div :class="item.icon" class="icon"></div>
        <div class="list-item-text">
          {{item.text}}
          <i class="cubeic-arrow"></i>
        </div>
      </div>
    </div>
    <!-- <cube-button @click="goLogin">登录</cube-button> -->
    <space></space>
    <cube-button @click="showBtn" v-if="username">退出登录</cube-button>
  </div>
</template>

<script>
import * as types from "../store/mutation-types";
import { mapMutations, mapState } from "vuex";
import Space from "../components/Space";
import Wallet from "../components/Wallet"

export default {
  data() {
    return {
      listData: [
        { id: 1, text: "我的订单", icon: "cubeic-hot" },
        { id: 2, text: "积分商城", icon: "cubeic-hot" },
        { id: 3, text: "饿了美外卖会员卡", icon: "cubeic-hot" },
        { id: 4, text: "服务中心", icon: "cubeic-hot" }
      ]
    };
  },
  computed: {
    ...mapState(["username", "token"])
  },
  methods: {
    ...mapMutations({
      setToken: types.SET_TOKEN,
      setUsername: types.SET_USERNAME
    }),
    goLogin() {
      if (!this.username) {
        this.$router.push({
          path: "/login",
          query: { redirect: this.$router.currentRoute.path }
        });
        // console.log(this.$router.currentRoute.path);
      }
    },
    showBtn() {
      this.$createDialog({
        type: "confirm",
        title: "退出登录",
        confirmBtn: {
          text: "确定",
          active: true,
          disabled: false,
          href: "javascript:;"
        },
        cancelBtn: {
          text: "取消",
          active: false,
          disabled: false,
          href: "javascript:;"
        },
        onConfirm: () => {
          const toast = this.$createToast({
            type: "warn",
            time: 1000,
            txt: "退出登录"
          });
          // 退出登录 清除token, 用户名
          this.setToken("");
          localStorage.removeItem("token");
          this.setUsername("");
          toast.show();
        },
        onCancel: () => {
          this.$createToast({
            type: "warn",
            time: 1000,
            txt: "点击取消按钮"
          }).show();
        }
      }).show();
    }
  },
  components: {
    Space,
    Wallet
  }
};
</script>

<style lang="scss" scoped>
.cube-dialog-title-def {
  font-size: 22px;
  margin-top: 20px;
}

.nav-mine {
  width: 100%;
  height: 80px;
  background: #02a774;
  border-top: 1px solid white;
  margin-top: 44px;

  .photo {
    float: left;
    width: 50px;
    height: 50px;
    border: none;
    outline: none;
    background: #ccc;
    border-radius: 50%;
    margin: 15px 10px;
  }

  .goLogin {
    height: 80px;
    overflow: hidden;
  }
  .nav-right {
    float: left;
    height: 50px;
    margin-top: 15px;
    color: white;
    font-size: 16px;
    width: 200px;

    p {
      line-height: 25px;

      &:first-child {
        font-weight: bold;
      }

      &:last-child {
        font-size: 12px;
      }
    }
  }

  .cubeic-arrow {
    float: right;
    width: 20px;
    height: 20px;
    font-size: 20px;
    color: white;
    line-height: 80px;
    margin-right: 10px;
  }
}

.list-item {
  padding-top: 10px;
  display: flex;

  &:first-child {
    border-top: 1px solid #ccc;
  }

  .icon {
    margin: 0 10px;
  }

  .list-item-text {
    font-size: 16px;
    line-height: 24px;
    flex: 1;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;

    i {
      float: right;
      margin-right: 10px;
      font-size: 12px;
    }
  }
}

.cube-btn {
  background: #ef4f4f;
  height: 35px;
  line-height: 0px;
  width: 90%;
  margin: 0 auto;
}
</style>