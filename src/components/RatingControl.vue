<template>
  <div class="rating-control">
    <div class="rating-filter border-1px">
      <span class="filter-item positive" :class="{active: filterType == 0}" @click="setFilter(0)">
        全部
        <i class="small">{{ratingCount.all}}</i>
      </span>
      <span class="filter-item positive" :class="{active: filterType == 1}" @click="setFilter(1)">
        {{positive}}
        <i class="small">{{ratingCount.positive}}</i>
      </span>
      <span class="filter-item negative" :class="{active: filterType == 2}" @click="setFilter(2)">
        {{negative}}
        <i class="small">{{ratingCount.negative}}</i>
      </span>
    </div>
    <div class="only-content" :class="{active: onlyContent}">
      <i class="icon-check_circle icon" @click="toggle"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
const All = 0;
export default {
  name: "RatingControl",
  props: {
    filterType: {
      type: Number,
      default: All
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    positive: {
      type: String,
      default: "满意"
    },
    negative: {
      type: String,
      default: "不满意"
    },
    ratingCount: Object
  },
  methods: {
    setFilter(type) {
      this.$emit("setFilter", type);
    },
    toggle() {
      this.$emit("toggleContent");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/mixin.scss";

.rating-filter {
  padding: 18px 0;
  @include scale-border-bottom(rgba(7, 17, 27, 0.1));

  .filter-item {
    display: inline-block;
    margin-right: 8px;
    padding: 8px 6px 8px 12px;
    border-radius: 2px;
    font-size: 12px;
    line-height: 16px;
    white-space: nowrap;
    color: rgb(77, 85, 93);

    .small {
      display: inline-block;
      font-size: 16px;
      transform: scale(0.5) translateY(50%);
    }

    &.positive {
      background: rgba(0, 160, 220, 0.2);

      &.active {
        background: rgb(0, 160, 220);
        color: #fff;
      }
    }

    &.negative {
      background: rgba(77, 85, 93, 0.2);

      &.active {
        background: rgb(77, 85, 93);
        color: #fff;
      }
    }
  }
}

.only-content {
  padding: 12px 0;
  color: rgb(147, 153, 159);
  font-size: 0;

  .icon {
    margin-right: 4px;
    font-size: 24px;
    line-height: 24px;
  }

  .text {
    font-size: 12px;
    line-height: 24px;
    vertical-align: top;
  }

  &.active {
    .icon {
      color: #01c1ae;
    }

    .text {
      color: rgb(7, 17, 27);
    }
  }
}
</style>