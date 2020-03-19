<template>
  <div class="goods-view">
    <div class="goods-menu" ref="goodMenu">
      <ul>
        <li
          v-for="(good,index) in goods"
          :key="index"
          :class="{active: index === currentIndex}"
          @click="selectedMenu(index)"
          class="menu-item"
        >
          <div class="menu-cell border-1px">
            <span v-if="good.type > 0" class="icon" :class="classMap[good.type]"></span>
            <span class="menu-name">{{good.name}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="goods-wrapper" ref="goodWrapper">
      <ul>
        <li v-for="(g,i) in goods" :key="i" ref="goodList">
          <h2 class="goods-title">{{g.name}}</h2>
          <div class="goods-item" v-for="(f,j)  in g.foods" :key="j" @click="showDetailView(f)">
            <div class="goods-item-content">
              <img class="food-icon" :src="f.icon" alt="icon" />
              <div class="food-container">
                <h3 class="food-name">{{f.name}}</h3>
                <p class="desc" v-if="f.description">{{f.description}}</p>
                <p class="desc">
                  月售{{f.sellCount}}份
                  <span>好评率{{f.rating}}%</span>
                </p>
                <p class="price">
                  ¥{{f.price}}
                  <span class="old-price" v-show="f.oldPrice">¥{{f.oldPrice}}</span>
                </p>
              </div>
              <div class="btn-wrapper">
                <count-control
                  :food="f"
                  :needDrop="true"
                  @add-handel="addFood"
                  @dec-handel="decFood"
                />
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <router-view></router-view>
    <ShopCart
      :seller="seller"
      :shopCartList="shopCartList"
      ref="shopcart"
      @add-handel="addFood"
      @dec-handel="decFood"
      @empty-handle="emptyFood"
    />
  </div>
</template>

<script>
import BScroll from "better-scroll";
import ShopCart from "./ShopCart";
import CountControl from "@/components/CountControl";

export default {
  name: "Goods",
  props: {
    classMap: Array,
    seller: Object
  },
  data: () => ({
    goods: [],
    currentIndex: 0,
    // 数组存放每一项商品分类的偏移量,页面滑动时根据数组来判断,用户当前访问的是哪一个分类
    goodListHeight: [],
  }),
  computed: {
    // 计算属性将商品数量大于零并且不同名的商品存放到该数组中
    shopCartList() {
      let arr = [];
      for (let i = 0; i < this.goods.length; i++) {
        let { foods } = this.goods[i];
        for (let j = 0; j < foods.length; j++) {
          let food = foods[j];
          // 先判断该商品数量是否大于0
          if (food.count > 0) {
            //再判断当前商品是否已经加入到购物车
            let f = arr.find(({ name }) => name === food.name);
            if (!f) {
              //若不存在则代表,该食品还未被被添加购物车,则需要添加
              arr.push(food);
            }
          }
          continue;
        }
      }
      return arr;
    }
  },
  methods: {
    // 计算商品栏每一个分类距离顶部的距离
    _calculateGoodListHeight() {
      let height = 0;
      let arr = [];
      arr.push(height);
      for (let i = 0; i < this.$refs.goodList.length; i++) {
        height += this.$refs.goodList[i].getBoundingClientRect().height;
        arr.push(height);
      }
      this.goodListHeight = arr;
      // console.log(this.goodListHeight)
    },
    // 初始化左边菜单栏better-scroll
    _initalMenuScroll() {
      this.$nextTick(() => {
        this._calculateGoodListHeight();
        if (!this.menuScroll) {
          // better-scroll 默认初始化的内部容器是不能被点击的
          this.menuScroll = new BScroll(this.$refs.goodMenu, {
            click: true // 允许内部元素被点击
          });
        } else {
          this.menuScroll.refresh();
        }
      });
    },
    // 初始化右边商品栏better-scroll
    _initalGoodScroll() {
      this.$nextTick(() => {
        if (!this.goodScroll) {
          // better-scroll 默认初始化的内部容器是不能被点击的
          this.goodScroll = new BScroll(this.$refs.goodWrapper, {
            click: true, // 允许内部元素被点击
            probeType: 3 //会在屏幕滑动的过程中实时的派发 scroll 事件
          });

          this.goodScroll.on("scroll", this.goodWrapperScroll); //监听商品栏滑动事件
        } else {
          this.goodScroll.refresh();
        }
      });
    },
    // 商品栏滚动时,高亮对应的菜单栏分类
    goodWrapperScroll({ y }) {
      y = Math.abs(y);
      for (let i = 0; i < this.goodListHeight.length - 1; i++) {
        if (y >= this.goodListHeight[i] && y < this.goodListHeight[i + 1]) {
          this.currentIndex = i;
          break;
        }
      }
    },
    // 选择菜单栏时,商品栏滚动到对应的位置
    selectedMenu(index) {
      this.currentIndex = index;
      //点击后让 商品栏滚动到指定位置
      this.goodScroll.scrollToElement(this.$refs.goodList[index], 300);
    },
    // 网络请求goods数据
    async getGoodsData() {
      let res = await this.$http("/api/goods");
      let { data } = res.data;
      this.goods = data;
      // 网络请求成功后触发
      this._initalMenuScroll();
      this._initalGoodScroll();
    },
    // 点击某个商品时,跳转到当前商品的详情页
    showDetailView(food) {
      console.log(food);
      this.$router.push({ name: "Detail", params: { food } });
    },
    // 某个商品add按钮被点击时,给指定的商品数量加1
    addFood({ food, rect }) {
      // 传进来的是food对象,解构赋值获取其属性name
      let { name } = food;
      // 双重for循环将商品与同名商品的数量加一
      for (let i = 0; i < this.goods.length; i++) {
        //第一重for循环遍历分类
        // 拿到每一个分类里的食品列表
        let { foods } = this.goods[i];
        // 第二重循环遍历每个商品
        for (let j = 0; j < foods.length; j++) {
          let food = foods[j];
          // 通过name判断当前用户是否点击时当前商品或其同名商品的add
          if (food.name === name) {
            // 给food.的count加一(注意food对象本身没有count,给对象添加新属性使用$set)
            if (!food.count) {
              this.$set(food, "count", 1);
            } else {
              food.count++;
            }
          }
        }
      }
      // 根据按钮点击后是否返回evt事件判断当前按钮被点击时是否需要调用子组件购物车的drop掉落小球方法
      if (rect) {
        this.$nextTick(() => {
          this.$refs.shopcart.drop(rect);
        });
      }
    },
    // 某个商品add按钮被点击时,给指定的商品数量减1
    decFood({ name }) {
      // 传进来的是food对象,解构赋值获取其属性name
      // 双重for循环将商品与同名商品的数量减1
      for (let i = 0; i < this.goods.length; i++) {
        //第一重for循环遍历分类
        // 拿到每一个分类里的食品列表
        let { foods } = this.goods[i];
        // 第二重循环遍历每个商品
        for (let j = 0; j < foods.length; j++) {
          let food = foods[j];
          // 通过name判断当前用户是否点击时当前商品或其同名商品的add
          if (food.name === name) {
            // 给food.的count减1
            food.count--;
            // 避免count小于零
            if (food.count < 0) {
              food.count = 0;
            }
          }
        }
      }
    },
    // 清空购物车
    emptyFood() {
      for(let i = 0; i < this.goods.length; i++) {
        let {foods} = this.goods[i];

        for(let j = 0; j < foods.length; j++) {
          let food = foods[j];
          if(food.count) {
            food.count = 0;
          }
        }
      }
    }
  },
  mounted() {
    this.getGoodsData();
  },
  components: {
    ShopCart,
    CountControl
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/mixin.scss";

.goods-view {
  display: flex;
  position: fixed;
  top: 174px;
  left: 0;
  right: 0;
  bottom: 48px;
  overflow: hidden;
}

.goods-menu {
  flex: 0 0 80px;
  background: #f3f5f7;

  .menu-item {
    display: table;
    padding: 0 12px;
    height: 54px;
    width: 100%;

    &.active {
      position: relative;
      top: -1px;
      background: white;
      font-weight: 600;
    }

    .menu-cell {
      display: table-cell;
      vertical-align: middle; // 垂直居中  flex也可以实现
      @include scale-border-bottom(rgba(7, 17, 27, 0.1));
    }

    .icon {
      display: inline-block;
      width: 12px;
      height: 12px;
      @include supports-icon(3, 12px 12px);
    }

    .menu-name {
      font-size: 12px;
      line-height: 25px;
      color: rgb(77, 85, 93);
      vertical-align: top;
    }
  }
}

.goods-title {
  padding: 0 14px;
  border-left: 1px solid #d9dde1;
  height: 26px;
  line-height: 26px;
  font-size: 12px;
  color: rgb(147, 153, 159);
  background: #f3f5f7;
}

.goods-item {
  padding: 0 18px;

  .goods-item-content {
    position: relative;
    display: flex;
    padding: 18px 0;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);

    .food-icon {
      flex: 0 0 57px;
      margin-right: 10px;
      height: 57px;
      width: 57px;
    }

    .food-container {
      flex: 1;
    }

    .food-name {
      margin-top: 2px;
      font-size: 14px;
      line-height: 14px;
      color: rgb(7, 17, 27);
    }

    .desc {
      margin-top: 8px;
      font-size: 10px;
      line-height: 12px;
      color: rgb(147, 153, 159);

      span {
        margin-left: 12px;
      }
    }

    .price {
      margin-top: 8px;
      font-size: 14px;
      line-height: 24px;
      font-weight: 700;
      color: rgb(240, 20, 20);

      .old-price {
        margin-left: 8px;
        font-size: 10px;
        color: rgb(147, 153, 159);
        text-decoration: line-through;
      }
    }

    .btn-wrapper {
      position: absolute;
      bottom: 18px;
      right: 0;
    }
  }
}
</style>