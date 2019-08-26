<template>
  <div class="cart-control">
    <transition name="move">
      <div class="cart-decrease" v-show="this.food.count">
        <span class="sell-remove_circle_outline" @click.stop="decrease"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="this.food.count">{{this.food.count}}</div>
    <div class="cart-add">
      <span class="sell-add_circle" @click.stop="add"></span>
    </div>
  </div>
</template>

<script lang="ecmascript-6">
const EVENT_ADD = 'add'

export default {
  props: {
    food: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    add(event) {
      if (!this.food.count) {
        this.$set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      this.$emit(EVENT_ADD, event.target)
    },
    decrease() {
      this.food.count--
      if (this.food.count < 0) this.food.count = 0
    }
  }
}
</script>

<style lang="stylus" scoped>
  .cart-control
    .cart-decrease, .cart-count, .cart-add
      display: inline-block
    .cart-decrease, .cart-add
      width: 24px
      height: 24px
      vertical-align: top
      font-size: 24px
      color: rgb(0, 160, 220)
      line-height: 24px
    .cart-count
      font-size: 10px
      color: rgb(147, 153, 159)
      line-height: 24px
      padding: 0 12px
      vertical-align: top
    .cart-decrease
      &.move-enter-active, &.move-leave-active
        transition: all 0.5s linear
      &.move-enter, &.move-leave-active
        opacity: 0
        transform: translateX(24px) rotate(180deg)
</style>
