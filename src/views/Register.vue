<template>
  <div>
    <i class="cubeic-close" @click="goback"></i>
    <div class="register-text">欢迎注册饿了美</div>
    <cube-form
      :model="model"
      :schema="schema"
      @validate="registerValidate"
      @submit="registerHandler"
    ></cube-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        setUsername: "",
        setPassword: "",
        comfirmPassword: ""
      },
      schema: {
        // 表单结构模型
        fields: [
          {
            type: "input",
            modelKey: "setUsername",
            label: "注册名",
            props: {
              placeholder: "请设置你的用户名"
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
            modelKey: "setPassword",
            label: "设置密码",
            props: {
              placeholder: "请输入密码",
              type: "password",
              eye: { open: false }
            },
            rules: {
              min: 6,
              required: true
            },
            messages: {
              required: "密码为必填项",
              min: "密码不得小于6个字符"
            },
            trigger: "blur"
          },
          {
            type: "input",
            modelKey: "comfirmPassword",
            label: "确认密码",
            props: {
              placeholder: "确认密码",
              type: "password",
              eye: { open: false }
            },
            rules: {
              min: 6,
              required: true,
              defferrnt: val => {
                if (val === this.model.setPassword) {
                  return true;
                } else {
                  return false;
                }
              }
            },
            messages: {
              required: "密码为必填项",
              min: "密码不得小于6个字符",
              defferrnt: "两次密码不一致"
            },
            trigger: "blur"
          },
          {
            type: "submit",
            label: "注册"
          }
        ]
      }
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    async registerHandler(e) {
      console.log("注册");
      e.preventDefault();

      let users =
        localStorage.getItem("users") ||
        JSON.stringify([{ username: new Date().getTime() }]);

      // GET请求  发送注册请求
      const result = await this.$http
        .get("/api/register", {
          params: {
            setUsername: this.model.setUsername,
            users: users
          }
        })
        .catch(err => {
          console.log("err ==> ", err);
        });

      console.log("result ==> ", result);
      const { code, message } = result.data;
      if (code == 1) {
        // 注册失败
        this.$createToast({
          time: 2000,
          txt: message,
          type: "error"
        }).show();
        console.log(message);
      } else if (code == 0) {
        // 注册成功 将账号密码添加到本地存储users中
        let item = JSON.parse(localStorage.getItem("users")) || [];
        item = [
          ...item,
          { username: this.model.setUsername, password: this.model.setPassword }
        ];
        localStorage.setItem("users", JSON.stringify(item));

        this.$createToast({
          time: 1000,
          txt: message
        }).show();

        // 回调到登录界面
        setTimeout(() => {
          this.$router.replace("/login");
          console.log(message);
        }, 1000);
      }
    },
    registerValidate() {}
  }
};
</script>

<style lang="scss" scoped>
.cubeic-close {
  margin: 5px;
  font-size: 32px;
  color: orange;
}

.register-text {
  text-align: center;
  font-size: 30px;
  margin-bottom: 15px;
}
</style>