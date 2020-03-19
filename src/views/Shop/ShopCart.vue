<template>
  <div class="shop-cart-wrapper">
    <div class="shop-cart">
      <div class="shop-cart-left" :class="{active: totalPrice > 0}">
        <div class="shop-cart-icon icon-shopping_cart" @click="toggleListFnc">
          <transition-group
            name="drop"
            @before-enter="beforeDropEnter"
            @enter="DropEnter"
            @after-enter="afterDropEnter"
          >
            <span class="ball" v-for="b in balls" :key="b.id" v-show="b.fly" :data-id="b.id"></span>
          </transition-group>
          <span class="count" v-show="totalCount">{{totalCount}}</span>
        </div>
        <h3 class="price">¥{{totalPrice}}</h3>
        <p class="desc">另需配送费¥{{seller.deliveryPrice}}元</p>
      </div>
      <div
        class="shop-cart-right"
        :class="{enough:totalPrice>=seller.minPrice}"
        @click="placeAnOrder"
      >{{buyBtnText}}</div>
    </div>
    <transition name="move">
      <div class="shop-cart-list" v-show="showList">
        <h3 class="list-header">
          购物车
          <span class="empty" @click="emptyCard">清空</span>
        </h3>
        <div class="list-container">
          <ul>
            <li class="list-item border-1px" v-for="food in shopCartList" :key="food.name">
              <div class="name">{{food.name}}</div>
              <div class="price">¥{{food.price}}</div>
              <div class="btn-wrapper">
                <CountControl :food="food" @add-handel="add" @dec-handel="dec" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div class="shop-cart-cover" v-show="showList" @click="toggleListFnc"></div>
    </transition>
  </div>
</template>

<script>
import CountControl from "@/components/CountControl";

export default {
  name: "ShopCart",
  props: {
    seller: Object,
    shopCartList: Array
  },
  data: () => ({
    price: 0,
    showListData: false,
    balls: [
      {
        id: 0,
        fly: false
      },
      {
        id: 1,
        fly: false
      },
      {
        id: 2,
        fly: false
      },
      {
        id: 3,
        fly: false
      },
      {
        id: 4,
        fly: false
      }
    ]
  }),
  computed: {
    showList() {
      if (!this.shopCartList.length) {
        this.toggleListFnc();
      }
      return this.showListData;
    },
    totalPrice() {
      let val = 0;

      this.shopCartList.forEach(item => {
        val += item.price * item.count;
      });

      return val;
    },
    totalCount() {
      let val = 0;

      this.shopCartList.forEach(item => {
        val += item.count;
      });

      return val;
    },
    buyBtnText() {
      if (!this.totalPrice) {
        return `¥${this.seller.minPrice}起送`;
      }
      if (this.totalPrice >= this.seller.minPrice) {
        return "立即购买";
      }
      return `还差¥${this.seller.minPrice - this.totalPrice}元起送`;
    }
  },
  methods: {
    add(food) {
      this.$emit("add-handel", food);
    },
    dec(food) {
      this.$emit("dec-handel", food);
    },
    toggleListFnc() {
      if (this.showListData) {
        this.showListData = false;
        return;
      }
      // 购物车列表一定要有商品才能展示
      if (this.shopCartList.length > 0) {
        this.showListData = true;
      }
    },
    // 选取一颗未飞行的小球,显示
    drop(rect) {
      let el = { x: rect.x, y: rect.y };
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.fly) {
          ball.fly = true;
          this.$set(ball, "el", el);
          break;
        }
      }
    },
    beforeDropEnter(el) {
      // el元素 包含一个自定义属性data-id获取当前显示的小球元素,对应的data属性中balls数组的的第几个对象
      let id = el.getAttribute("data-id");
      // 根据id找寻对应的 balls数组中的对象
      let ball = this.balls.find(item => item.id == id);
      // 获取小球距离屏幕左边与上方的距离
      // 小球距离屏幕的左边33px,小球距离屏幕下方39px
      // 计算小球应该便宜的X,Y轴的偏移量
      /*
                let offsetX = ball.el.x - 33 // 33是小球距离屏幕左边的距离
                let offsetY = screen.height - ball.el.y - 39
                console.log(offsetX, offsetY)
                // 将小球移动到偏移量的位置
                // el.style.transform = `translateX(${offsetX}px) translateY(-${offsetY}px)`
                 */
      let offsetX = ball.el.x - 33 + 15; // 33是小球距离屏幕左边的距离
      let offsetY = 13 - (screen.height - ball.el.y - 39);
      el.style.top = offsetY + "px";
      el.style.left = offsetX + "px";
    },
    DropEnter(el, done) {
      // eslint不检查下面一行的代码
      // eslint-disable-next-line
      let height = el.offsetHeight; // 强制刷新页面
      // console.log(height)
      let transitionEnd = () => {
        el.removeEventListener("transitionend", transitionEnd);
        done();
      };

      el.addEventListener("transitionend", transitionEnd);
      // el.style.transform = 'translateX(0) translateY(0)'
      el.style.top = "13px";
      el.style.left = "15px";
    },
    afterDropEnter(el) {
      let id = el.getAttribute("data-id");
      // 根据id找寻对应的 balls数组中的对象
      let ball = this.balls.find(item => item.id == id);
      ball.fly = false; // 动画结束后隐藏该小球
    },
    emptyCard() {
      // this.$emit('empty-handle')
      this.$createDialog({
        type: "confirm",
        title: "提示",
        content: "确定清空购物车吗",
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
            type: "right",
            time: 500,
            txt: "购物车已清空"
          });
          this.$emit("empty-handle");
          toast.show();
        },
        onCancel: () => {
          this.$createToast({
            type: "warn",
            time: 500,
            txt: "点击取消按钮"
          }).show();
        }
      }).show();
    },
    placeAnOrder() {
      if (this.totalPrice >= this.seller.minPrice) {
        this.$createDialog({
          type: "confirm",
          title: "提示",
          content: "确定下单",
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
              type: "right",
              time: 500,
              txt: "下单成功"
            });

            let order = {};

            order.username = this.$store.state.username; // 用户名
            order.name = this.seller.name; // 店名
            order.avatar = this.seller.avatar; // 店铺图片
            order.description = this.seller.description; // 蜂鸟快送
            order.deliveryPrice = this.seller.deliveryPrice; // 配送费
            order.date = new Date().getTime(); // 下单时间
            order.totalPrice = this.totalPrice + this.seller.deliveryPrice; // 下单价格
            order.foods = []; // 下单商品
            for (let i = 0; i < this.shopCartList.length; i++) {
              order.foods.push(this.shopCartList[i]);
            }

            let orderData = JSON.parse(localStorage.getItem("orderData")) || [];

            orderData.unshift(order);

            localStorage.setItem("orderData", JSON.stringify(orderData));

            // 清空购物车
            this.$emit("empty-handle");
            this.$router.push('/order');
            toast.show();
          },
          onCancel: () => {
            this.$createToast({
              type: "warn",
              time: 500,
              txt: "点击取消按钮"
            }).show();
          }
        }).show();

      }
    }
  },
  components: {
    CountControl
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/mixin.scss";

.shop-cart-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  z-index: 30;
}

.shop-cart {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #141d27;
  color: rgb(147, 153, 159);
  z-index: 40;

  .shop-cart-left {
    position: relative;
    flex: 1;
    padding: 12px;
    z-index: 40;

    &.active {
      .shop-cart-icon {
        color: #fff;
        background: rgb(0, 160, 220);
      }

      .price {
        color: #fff;
      }
    }

    .shop-cart-icon {
      position: relative;
      top: -22px;
      margin-right: 12px;
      display: inline-block;
      width: 56px;
      height: 56px;
      border: 6px solid #141d27;
      border-radius: 50%;
      font-size: 24px;
      line-height: 44px;
      text-align: center;
      background: #2b343c;

      .count {
        position: absolute;
        display: inline-block;
        right: -5px;
        top: -5px;
        width: 24px;
        height: 16px;
        line-height: 16px;
        border-radius: 8px;
        font-size: 9px;
        text-align: center;
        color: #fff;
        background: rgb(240, 20, 20);
      }

      .ball {
        position: absolute;
        left: 15px;
        top: 13px;
        display: inline-block;
        width: 16px;
        height: 16px;
        background: rgb(240, 20, 20);
        border-radius: 50%;

        &.drop-enter-active {
          /*transform: translateX();*/
          /*transition: tran*/
          transition: top 0.5s cubic-bezier(0.32, -0.5, 0.7, -0.4),
            left 0.5s linear;
        }
      }
    }

    .price {
      display: inline-block;
      margin-right: 12px;
      padding-right: 12px;
      border-right: 1px solid rgba(255, 255, 255, 0.1);
      font-size: 16px;
      line-height: 24px;
      vertical-align: top;
      font-weight: 700;
    }

    .desc {
      display: inline-block;
      font-size: 12px;
      vertical-align: top;
      line-height: 24px;
    }
  }

  .shop-cart-right {
    flex: 0 0 105px;
    padding: 12px 8px;
    text-align: center;
    background: #2b343c;
    font-size: 12px;
    font-weight: 700;
    line-height: 24px;

    &.enough {
      color: #fff;
      background: #01c1ae;
    }
  }
}

.shop-cart-list {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transform: translateY(-100%);
  z-index: 30;

  &.move-enter,
  &.move-leave-to {
    transform: translateY(0);
  }

  &.move-enter-active,
  &.move-leave-active {
    transition: all 0.5s linear;
  }

  &.move-enter-to,
  &.move-leave {
    transform: translateY(-100%);
  }

  .list-header {
    height: 40px;
    padding: 0 18px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    line-height: 40px;
    font-size: 14px;
    color: rgb(7, 17, 27);
    background: #f3f5f7;

    .empty {
      float: right;
      font-size: 12px;
      color: rgb(0, 160, 220);
    }
  }

  .list-container {
    padding: 0 18px;
    background: #fff;
    max-height: 217px;
    overflow: auto;

    .list-item {
      display: flex;
      padding: 12px 0;
      height: 48px;
      @include scale-border-bottom(rgba(7, 17, 27, 0.1));
    }

    .name {
      flex: 1;
      line-height: 24px;
      font-size: 14px;
      color: rgb(7, 17, 27);
    }

    .price {
      margin-left: 18px;
      vertical-align: top;
      line-height: 24px;
      font-size: 14px;
      font-weight: 700;
      color: rgb(240, 20, 20);

      &:first-letter {
        font-size: 10px;
        font-weight: normal;
      }
    }

    .btn-wrapper {
      flex: 0 0 72px;
      width: 72px;
      margin-left: 12px;
      text-align: right;
    }
  }
}

.shop-cart-cover {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(7, 17, 27, 0.6);
  filter: blur(10px);
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s linear;
}

.fade-enter-to,
.fade-leave {
  opacity: 1;
}
</style>