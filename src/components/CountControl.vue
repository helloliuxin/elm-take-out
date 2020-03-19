<template>
  <div class="count-control">
    <transition name="scroll">
      <span class="icon-remove_circle_outline btn" v-show="count" @click.stop="dec"></span>
    </transition>
    <transition name="fade">
      <span class="count" v-show="count">{{count}}</span>
    </transition>
    <span class="icon-add_circle btn" @click.stop="add"></span>
  </div>
</template>

<script>
export default {
  name: "CountControl",
  props: {
    food: Object,
    needDrop: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    count() {
      return this.food.count || 0;
    }
  },
  methods: {
    add(evt) {
      let rect = evt.target.getBoundingClientRect();
      let val = { food: this.food, rect };
      if (!this.needDrop) {
        val = { food: this.food };
      }
      this.$emit("add-handel", val);
    },
    dec() {
      this.$emit("dec-handel", this.food);
    }
  }
};
</script>

<style lang="scss" scoped>
.count-control {
  font-size: 0;
}

.scroll-enter,
.scroll-leave-to {
  opacity: 0.2;
  transform: translateX(36px) rotate(180deg);
}

.fade-enter,
.fade-leave-to {
  opacity: 0.1;
}

.scroll-enter-active,
.scroll-leave-active,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s linear;
}

.fade-enter-to,
.fade-leave {
  opacity: 1;
}

.scroll-enter-to,
.scroll-leave {
  opacity: 1;
  transform: translateX(0) rotate(0);
}

.btn {
  display: inline-block;
  font-size: 24px;
  line-height: 24px;
  color: rgb(0, 160, 220);
}

.count {
  display: inline-block;
  width: 24px;
  vertical-align: top;
  font-size: 10px;
  line-height: 24px;
  text-align: center;
  color: rgb(147, 153, 159);
}
</style>