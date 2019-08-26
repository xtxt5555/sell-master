<template>
  <div class="star-bar">
    <ul class="clear-fix" :class="sizeClass">
      <li v-for="(item, index) in itemClasses" :class='item' class="star-item" :key="index"></li>
    </ul>
  </div>
</template>

<script lang="ecmascript-6">
const STAR_LENGTH = 5
const CLS_ON = 'star-on'
const CLS_HALF = 'star-half'
const CLS_OFF = 'star-off'
// 4.2
export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    sizeClass() {
      return 'size-' + this.size
    },
    itemClasses() {
      let result = []
      let _score = Math.floor(Math.floor(this.score * 2) / 2)
      for (var i = 0; i < _score; i++) {
        result.push(CLS_ON)
      }
      if (_score % 1 !== 0) {
        result.push(CLS_HALF)
      }
      for (i = 0; i < STAR_LENGTH - result.length; i++) {
        result.push(CLS_OFF)
      }
      return result
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import 'common/stylus/index.styl'
  .star-bar
    display: inline-block
    .size-48
      height: 20px
      .star-item
        display: inline-block
        width: 20px
        height: 20px
        margin-right: 20px
        &:last-child
          margin-right: 0
        &.star
          &-on
            bg-img: 'star48_on'
            background-size: 20px 20px
          &-half
            bg-img: 'star48_half'
            background-size: 20px 20px
          &-off
            bg-img: 'star48_off'
            background-size: 20px 20px
    .size-36
      height: 15px
      .star-item
        display: inline-block
        width: 15px
        height: 15px
        margin-right: 15px
        &:last-child
          margin-right: 0
        &.star
          &-on
            bg-img: 'star36_on'
            background-size: 15px 15px
          &-half
            bg-img: 'star36_half'
            background-size: 15px 15px
          &-off
            bg-img: 'star36_off'
            background-size: 15px 15px
    .size-24
      height: 10px
      .star-item
        display: inline-block
        width: 10px
        height: 10px
        margin-right: 10px
        &:last-child
          margin-right: 0
        &.star
          &-on
            bg-img: 'star24_on'
            background-size: 10px 10px
          &-half
            bg-img: 'star24_half'
            background-size: 10px 10px
          &-off
            bg-img: 'star24_off'
            background-size: 10px 10px
</style>
