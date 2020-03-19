<template>
  <div class="login">
    <i class="cubeic-close" @click="goback"></i>
    <div class="text">密码登录</div>
    <cube-form :model="model" :schema="schema" @validate="validateHandler" @submit="loginHandler"></cube-form>
    <div class="register" @click="goRegister">没有账号？去注册</div>
  </div>
</template>

<script>
import * as types from '../store/mutation-types'

export default {
  data() {
    return {
      model: {
        // 数据模型
        username: "",
        password: ""
      },
      schema: {
        // 表单结构模型
        fields: [
          {
            type: "input",
            modelKey: "username",
            label: "用户名",
            props: {
              placeholder: "请输入用户名"
            },
            rules: {
              //效验规则
              type: "string",
              required: true,
              min: 3,
              max: 15
            },
            messages: {
              required: "用户名为必填项",
              min: "用户名不得小于3个字符",
              max: "用户名不得大于15个字符"
            },
            trigger: "blur"
          },
          {
            type: "input",
            modelKey: "password",
            label: "密码",
            props: {
              placeholder: "请输入密码",
              type: "password",
              eye: { open: false }
            },
            rules: {
              required: true,
              min: 6
            },
            messages: {
              required: "密码为必填项",
              min: "密码不得小于6个字符"
            },
            trigger: "blur"
          },
          {
            type: "submit",
            label: "登录"
          }
        ]
      }
    };
  },
  methods: {
    async loginHandler(e) {
      e.preventDefault(); // 避免表单的默认提交行为

      let users = localStorage.getItem("users") ||
        JSON.stringify([{username: new Date().getTime()}]);

      // POST请求登录
      const res = await this.$http.post('/api/login', {
        username: this.model.username,
        password: this.model.password,
        users: users
      })

      console.log('res ==> ', res);
      const {code, token, message} = res.data;
      if (code == 0) {
        // 登录成功
        localStorage.setItem('token', token); // 将token缓存至本地存储
        this.$store.commit(types.SET_TOKEN, token); // 存入store
        this.$store.commit(types.SET_USERNAME, this.model.username);
        // 回跳
        const redirect = this.$route.query.redirect || '/';
        this.$router.replace(redirect);
      } else {
        // 登录失败 显示弹窗
        const toast = this.$createToast({
          time: 2000, // 弹窗显示2s
          txt: message || '登录失败',
          type: 'error'
        });
        toast.show();
      }
    },
    validateHandler(ret) {
      // 效验
      console.log("效验" + ret);
    },
    goback() {
      this.$router.go(-1);
    },
    goRegister() {
      this.$router.push('/register');
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
}

.cubeic-close {
  margin: 5px;
  font-size: 32px;
  color: orange;
}

.text {
  margin: 20px 0 10px 20px;
}

.register {
  text-align: right;
  font-size: 14px;
  color: orange;
  margin-right: 15px;
}
</style>