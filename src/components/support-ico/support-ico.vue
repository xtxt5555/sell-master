<template>
  <span class="icon" :class="`${sizeMap(size)} ${supportMap(support)}`"></span>
</template>

<script lang="ecmascript-6">
export default {
  props: {
    size: { // 1和2两个值，1为小(@2x)，2为大(@3x)
      type: Number,
      default() {
        return 1
      }
    },
    support: {
      type: Number
    }
  },
  methods: {
    supportMap(type) {
      let supports = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
      return supports[type]
    },
    sizeMap(type) {
      let size = ['small', 'big']
      return size[type - 1]
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/index.styl'
  .icon
    display: inline-block
    vertical-align: middle
    &.small
      width: 12px
      height 12px
      background-size: 12px 12px
      background-repeat: no-repeat
      &.decrease
        bg-img: 'decrease_1'
      &.discount
        bg-img: 'discount_1'
      &.guarantee
        bg-img: 'guarantee_1'
      &.invoice
        bg-img: 'invoice_1'
      &.special
        bg-img: 'special_1'
    &.big
      width: 16px
      height 16px
      background-size: 16px 16px
      background-repeat: no-repeat
      &.decrease
        bg-img: 'decrease_2'
      &.discount
        bg-img: 'discount_2'
      &.guarantee
        bg-img: 'guarantee_2'
      &.invoice
        bg-img: 'invoice_2'
      &.special
        bg-img: 'special_2'
</style>
