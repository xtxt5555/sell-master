<template>
  <transition
    name="move"
    @after-leave="onLeave"
  >
    <div class="food" v-show="visible">
      <cube-scroll ref="scroll" :data="computedRatings">
        <div class="food-content">
          <div class="image-header">
            <img :src="food.image">
            <div class="back" @click="hide">
              <i class="sell-arrow_lift"></i>
            </div>
          </div>
          <div class="content">
            <h1 class="title">{{food.name}}</h1>
            <div class="detail">
              <span class="sell-count">月售{{food.sellCount}}份</span>
              <span class="rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price">
              <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
            </div>
            <div class="cart-control-wrapper">
              <cart-control :food="food" @add="addFood"></cart-control>
            </div>
            <transition name="fade">
              <div class="buy" v-show="!food.count" @click.stop="addFirst">加入购物车</div>
            </transition>
          </div>
          <split v-show="food.info"></split>
          <div class="info" v-show="food.info">
            <h1 class="title">商品信息</h1>
            <p class="text">{{food.info}}</p>
          </div>
          <split></split>
          <div class="rating">
            <h1 class="title">商品评价</h1>
            <div class="rating-wrapper">
              <rating-select
                :ratings="ratings"
                :onlyContent="onlyContent"
                :desc="desc"
                :selectType="selectType"
                @select = "onSelectType"
                @toggle = "onToggle"
              ></rating-select>
              <ul v-show="ratings && ratings.length">
                <li
                  v-for="(rating, index) in computedRatings"
                  class="rating-item border-bottom-1px"
                  :key="index"
                >
                  <div class="user">
                    <span class="name">{{rating.username}}</span>
                    <img class="avatar" width="12" height="12" :src="rating.avatar">
                  </div>
                  <div class="time">{{format(rating.rateTime)}}</div>
                  <p class="text">
                    <span
                      :class="{
                        'icon-thumb_up': rating.ratingType === 0,
                        'icon-thumb_down': rating.rateType === 1
                      }"
                    ></span>{{rating.text}}
                  </p>
                </li>
              </ul>
              <div class="no-rating" v-show="!ratings || !ratings.length">暂无评价</div>
            </div>
          </div>
        </div>
      </cube-scroll>
    </div>
  </transition>
</template>

<script lang="ecmascript-6">
import Split from 'components/split/split'
import CartControl from 'components/cart-control/cart-control'
import RatingSelect from 'components/rating-select/rating-select'
import popupMixin from 'common/js/popupMixin'
import ratingSelectMixin from 'common/js/ratingSelectMixin'
import moment from 'moment'

const EVENT_SHOW = 'show'
const EVENT_LEAVE = 'leave'
const EVENT_ADD = 'add'

export default {
  name: 'food',
  mixins: [popupMixin, ratingSelectMixin],
  components: {
    Split,
    CartControl,
    RatingSelect
  },
  data() {
    return {
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  props: {
    food: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    ratings() {
      return this.food.ratings
    }
  },
  methods: {
    onLeave() {
      this.$emit(EVENT_LEAVE)
    },
    addFirst(eve) {
      this.$set(this.food, 'count', 1)
      this.$emit(EVENT_ADD, eve.target)
    },
    addFood(target) {
      this.$emit(EVENT_ADD, target)
    },
    format(time) {
      return moment(time).format('YYYY-MM-DD hh:mm')
    }
  },
  created() {
    this.$on(EVENT_SHOW, () => {
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    })
  }
}
</script>

<style lang="stylus" scoped>
  @import "common/stylus/index"

  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    z-index: 30
    width: 100%
    background: rgb(255, 255, 255)
    &.move-enter-active, &.move-leave-active
      transition: all 0.3s linear
    &.move-enter, &.move-leave-active
      transform: translate3d(100%, 0, 0)
    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 10px
        left: 0
        .sell-arrow_lift
          display: block
          padding: 10px
          font-size: 20px
          color: rgb(255, 255, 255)

    .content
      position: relative
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
      .detail
        margin-bottom: 18px
        line-height: 10px
        height: 10px
        .sell-count, .rating
          font-size: 10px
          color: rgb(147, 153, 159)
        .sell-count
          margin-right: 12px
      .price
        line-height: 24px
        font-weight: 700
        .now
          margin-right: 8px
          font-size: 14px
          color: rgb(240, 20, 20)
        .old
          text-decoration: line-through
          font-size: 10px
          color: rgb(143, 157, 159)
      .cart-control-wrapper
        position: absolute
        right: 18px
        bottom: 18px
      .buy
        position: absolute
        right: 18px
        bottom: 18px
        z-index: 10
        height: 24px
        line-height: 24px
        padding: 0 12px
        box-sizing: border-box
        border-radius: 12px
        font-size: 12px
        color: rgb(255, 255, 255)
        background: rgb(0, 160, 220)
        opacity: 1
        &.fade-enter-active, &.fade-leave-active
          transition: all 0.3s
        &.fade-enter, &.fade-leave-active
          opacity: 0
          z-index: -1
    .info
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 6px
        font-size: 14px
        color: rgb(7, 17, 27)
      .text
        line-height: 24px
        padding: 0 8px
        font-size: 12px
        color: rgb(77, 85, 93)
    .rating
      padding-top: 18px
      .title
        line-height: 14px
        margin-left: 18px
        font-size: 14px
        color: rgb(7, 17, 27)
      .rating-wrapper
        padding: 0 18px
        .rating-item
          position: relative
          padding: 16px 0
          &:last-child
            border-none()
          .user
            position: absolute
            right: 0
            top: 16px
            display: flex
            align-items: center
            line-height: 12px
            .name
              margin-right: 6px
              font-size: 10px
              color: rgb(147, 153, 159)
            .avatar
              border-radius: 50%
          .time
            margin-bottom: 6px
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
          .text
            line-height: 16px
            font-size: 12px
            color: rgb(7, 17, 27)
            .icon-thumb_up, .icon-thumb_down
              margin-right: 4px
              line-height: 16px
              font-size: 12px
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .icon-thumb_down
              color: rgb(147, 153, 159)

        .no-rating
          padding: 16px 0
          font-size: 12px
          color: rgb(147, 153, 159)
</style>
