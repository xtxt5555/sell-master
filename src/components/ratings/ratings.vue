<template>
  <cube-scroll class="ratings" :options="scrollOptions" :data="computedRatings">
    <div class="rating-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star class="star" :size=36 :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star class="star" :size=36 :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-time">
            <span class="title">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <div class="rating-wrapper">
        <rating-select
          :ratings="ratings"
          :onlyContent="onlyContent"
          :selectType="selectType"
          @select = "onSelectType"
          @toggle = "onToggle"
        ></rating-select>
        <ul>
          <li
            v-for="(rating, index) in computedRatings"
            :key="index"
            class="rating-item border-1px"
          >
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star class="star" :size=24 :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend">
                <span class="sell-thumb_up"></span>
                <span
                  class="item"
                  v-for="(item, index) in rating.recommend"
                  :key="index"
                >
                  {{item}}
                </span>
              </div>
              <div class="time">
                {{format(rating.rateTime)}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </cube-scroll>
</template>

<script lang="ecmascript-6">
import Star from 'components/star/star'
import Split from 'components/split/split'
import ratingSelect from 'components/rating-select/rating-select'
import { getRatings } from 'api'
import ratingSelectMixin from 'common/js/ratingSelectMixin'
import moment from 'moment'

export default {
  components: {
    Star,
    Split,
    ratingSelect
  },
  mixins: [ratingSelectMixin],
  data() {
    return {
      ratings: [],
      scrollOptions: {
        click: false,
        drectionLockThreshold: 0
      }
    }
  },
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    seller() {
      return this.data
    }
  },
  methods: {
    fetch() {
      if (!this.fetched) {
        this.fetched = true
        getRatings({ id: this.seller.id }).then((data) => {
          this.ratings = data
        })
      }
    },
    format(time) {
      return moment(time).format('YYYY-MM-DD hh:mm')
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import 'common/stylus'
  .rating-content
    width: 100%
    .overview
      padding: 18px 0
      display: flex
      .overview-left
        flex: 0 0 137px
        text-align: center
        border-right: 1px solid rgb(153, 157, 159)
        @media only screen and (max-width: 320px)
          flex: 0 0 120px
          width: 120px
        .score
          font-size: 24px
          color: rgb(255, 153, 0)
          line-height: 28px
          margin-bottom: 6px
        .title
          font-size: 12px
          color: rgb(7, 17, 27)
          line-height: 12px
          margin-bottom: 8px
        .rank
          font-size: 10px
          color: rgb(147, 153, 159)
          line-height: 10px
      .overview-right
        flex: 1
        padding-left: 24px
        @media only screen and (max-width: 320px)
          padding-left: 6px
        .score-wrapper
          height: 18px
          display: flex
          align-items: center
          margin-bottom: 8px
          .title
            font-size: 12px
            color: rgb(7, 17, 27)
            line-height: 18px
          .star
            margin: 0 10px
            >>>.star-item
              margin-right: 6px
          .score
            font-size: 12px
            color: rgb(255, 153, 0)
            line-height: 18px
        .delivery-time
          .title
            font-size: 12px
            color: rgb(7, 17, 27)
            line-height: 18px
            margin-right: 12px
          .time
            font-size: 12px
            color: rgb(153, 157, 159)
            line-height: 18px
    .rating-wrapper
      padding: 18px
      .rating-item
        display: flex
        border-1px: rgba(7, 17, 27 ,0.1)
        padding: 18px 0
        .avatar
          flex: 0 0 28px
          width: 28px
          height: 28px
          margin-right: 12px
          img
            border-radius: 50%
        .content
          flex: 1
          position: relative
          white-space: normal
          .name
            font-size: 10px
            color: rgb(7, 17, 27)
            line-height: 12px
            margin-bottom: 4px
          .star-wrapper
            margin-bottom: 6px
            .star
              margin-right: 6px
              >>>.star-item
                margin-right: 3px
            .delivery
              font-size: 10px
              font-weight: 200
              color: rgb(147, 153, 159)
              line-height: 12px
          .text
            width: 100%
            font-size: 12px
            color: rgb(7, 17, 27)
            line-height: 18px
          .recommend
            .sell-thumb_up
              font-size: 12px
              color: rgb(0, 160, 220)
              line-height: 16px
              margin-right: 8px
            .item
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 2px
              font-size: 9px
              color: rgb(147, 153, 159)
              line-height: 16px
              padding: 0 6px
              margin-right: 8px
          .time
            position: absolute
            top: 0
            right: 0
            font-size: 10px
            font-weight: 200
            line-height: 12px
            color: rgb(153, 157, 159)
</style>
