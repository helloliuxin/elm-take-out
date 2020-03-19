<template>
  <div class="wallet">
    <div v-for="(item, index) in walletData" :key="index" class="chunk">
      <p>
        <span class="count">{{item.num}}</span>
        <span>{{item.unit}}</span>
      </p>
      <p class="wallet-text">{{item.text}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      walletData: [
        { num: "0.00", unit: "元", text: "我的余额" },
        { num: 0, unit: "个", text: "我的优惠" },
        { num: 0, unit: "分", text: "我的积分" }
      ],
    };
  }
};
</script>

<style lang="scss" scoped>
.wallet {
  display: flex;
  width: 100%;
  text-align: center;
  height: 60px;

  .chunk {
    flex: 1;
    border-bottom: 1px solid #ccc;

    p:first-child {
      margin: 10px 0 3px;
      font-size: 14px;

      .count {
        font-size: 24px;
        font-weight: 600;
        color: rebeccapurple;
      }
    }

    p:last-child {
      font-size: 12px;
    }

    &:nth-child(2) {
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
    }
  }
}
</style>