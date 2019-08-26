<template>
  <transition name="fade">
    <div class="detail-wrapper" v-show="visible">
      <div class="detail-main">
        <div class="title">{{seller.name}}</div>
        <div class="star-wrapper">
          <star class="star" :size=48 :score="seller.score"></star>
        </div>
        <div class="support-wrapper">
          <div class="info">
            <div class="line"></div>
            <div class="message">优惠信息</div>
            <div class="line"></div>
          </div>
          <div class="support">
            <div class="support-item" v-for="(item, index) in seller.supports" :key="index">
              <support-ico :size=2 :support="item.type"></support-ico>
              <span class="support-info">{{item.description}}</span>
            </div>
          </div>
          <div class="bulletin-wrapper">
            <div class="info">
              <div class="line"></div>
              <div class="message">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              {{seller.bulletin}}
            </div>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="close">
        <i class="sell-close"></i>
      </div>
    </div>
  </transition>
</template>
<script lang="ecmascript-6">
import Star from '../star/star'
import SupportIco from '../support-ico/support-ico'

export default {
  name: 'head-detail',
  components: {
    Star,
    SupportIco
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    show() {
      this.visible = true
    },
    close() {
      this.visible = false
      this.changeShowDetail(false)
    }
  },
  props: {
    seller: {
      type: Object
    },
    changeShowDetail: {
      type: Function
    }
  }
}
</script>

<style lang="stylus" scoped>
  .detail-wrapper
    width: 100%
    height: 100%
    position: fixed
    left: 0
    top: 0
    z-index: 100
    padding: 64px 36px
    box-sizing: border-box
    text-align: center
    background-color: rgba(7, 17, 27, .8)
    &.fade-enter-active, &.fade-leave-active
      transition: opacity .5s
    &.fade-enter, &.fade-leave-active
      opacity: 0
    .detail-main
      height: 100%
      .info
          display: flex
          margin-bottom: 24px
          vertical-align: middle
          .message
            font-size: 14px
            line-height: 14px
            font-weight: 700
            color: rgb(255, 255, 255)
            margin: 0 24px
          .line
            flex: 1
            height: 6px
            border-bottom: 1px solid rgba(255, 255, 255, .2)
      .title
        font-size: 16px
        line-hight: 16px
        color: rgb(255, 255, 255)
        font-weight: 700
        margin-bottom: 16px
      .star-wrapper
        padding-top: 2px
        height: 22px
        margin-bottom: 28px
        text-align: center
      .support-wrapper
        width: 100%
        .support
          margin: 0 12px
          margin-bottom: 28px
          .support-item
            margin-bottom: 12px
            text-align: left
            .support-info
              font-size: 12px
              font-weight: 200
              color: white
              line-hight: 12px
              margin-left: 6px
            &:last-child
              margin-bottom: 0
      .bulletin-wrapper
        .bulletin
          padding: 0 12px
          font-size: 12px
          line-height: 24px
          font-weight: 200
          color: rgb(255, 255, 255)
          text-align: left
    .detail-close
        .sell-close
          font-size: 27px
          color: rgba(255, 255, 255, 0.7)
</style>
