<template>
  <div class="rating-select">
    <div class="rating-type border-bottom-1px">
      <span class="block positive"
        :class="{active: selectType === 2}"
        @click="select(2)"
      >{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span class="block positive"
        :class="{active: selectType === 0}"
        @click="select(0)"
      >{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span class="block negative"
        :class="{active: selectType === 1}"
        @click="select(1)"
      >{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div class="switch" :class="{on: onlyContent}" @click="toggle">
      <div class="sell-check_circle"></div>
      <div class="text">只看有内容的评价</div>
    </div>
  </div>
</template>

<script lang="ecmascript-6">
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
const EVENT_SELECT = 'select'
const EVENT_TOGGLE = 'toggle'

export default {
  props: {
    ratings: {
      type: Array,
      default() {
        return []
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default() {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  },
  computed: {
    positives() {
      return this.ratings.filter(rating => {
        return rating.rateType === POSITIVE
      })
    },
    negatives() {
      return this.ratings.filter(rating => {
        return rating.rateType === NEGATIVE
      })
    }
  },
  methods: {
    select(type) {
      this.$emit(EVENT_SELECT, type)
    },
    toggle() {
      this.$emit(EVENT_TOGGLE)
    }
  }
}
</script>

<style lang="stylus">
  @import 'common/stylus'
  .rating-select
    .rating-type
      padding: 18px 0
      margin: 0 18px
      .block
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        line-height: 16px
        border-radius: 1px
        font-size: 12px
        color: rgb(77, 85, 93)
        &.active
          color: rgb(255, 255, 255)
        .count
          margin-left: 2px
        &.positive
          background: rgba(0, 160, 220, 0.2)
          &.active
            background: rgb(0, 160, 220)
        &.negative
          background: rgba(77, 85, 93, 0.2)
          &.active
            background: $color-grey
    .switch
      display: flex
      align-items: center
      padding: 12px 18px
      line-height: 24px
      border-bottom: 1px solid #ebebeb
      color: #999
      &.on
        .sell-check_circle
          color: #00b43c
      .sell-check_circle
        margin-right: 4px
        font-size: 20px
      .text
        font-size: 10px
</style>
