<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar"></div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="delivery">
          {{seller.description}}/{{seller.deliveryTime}}钟送达
        </div>
        <div class="support-item" v-if="seller.supports">
          <support-ico :size=1 :support="seller.supports[0].type"></support-ico>
          <span class="info">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="detail" v-if="seller.supports" @click="showDetail">
        {{seller.supports.length}}个<i class="sell-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="notice"></span>
      <span class="content">{{seller.bulletin}}</span>
      <i class="sell-keyboard_arrow_right"></i>
    </div>
    <div class="background"></div>
  </div>
</template>

<script lang="text/ecmascript-6">
import SupportIco from 'components/support-ico/support-ico'
export default {
  components: {
    SupportIco
  },
  props: {
    seller: {
      type: Object
    },
    changeShowDetail: {
      type: Function
    }
  },
  methods: {
    showDetail() {
      this.headDetailComp = this.headDetailComp ||
      this.$createHeadDetail({
        $props: {
          seller: 'seller',
          changeShowDetail: 'changeShowDetail'
        }
      })
      this.headDetailComp.show()
      this.changeShowDetail(true)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/index.styl'
.header
  position: relative
  .content-wrapper
    box-sizing: border-box
    width: 100%
    padding: 24px 12px 18px 24px
    position: relative
    .avatar
      display: inline-block
      width: 64px
      height: 64px
      background: url(avatar.jpg) no-repeat
      background-size: 64px 64px
    .content
      display: inline-block
      vertical-align: top
      margin: 2px 0 0 16px
      .title
        margin-bottom: 8px
        .brand
          display: inline-block
          width: 30px
          height: 18px
          bg-img: 'brand'
          background-size: 30px 18px
          background-repeat: no-repeat
        .name
          vertical-align: top
          margin-left: 6px
          font-size: 16px
          color: rgb(255, 255, 255)
          font-weight: bold
          line-height: 18px
      .delivery
        font-size: 12px
        color: rgb(255, 255, 255)
        line-height: 12px
        font-weight: 200
        margin-bottom: 10px
      .support-item
        font-size: 10px
        color: rgb(255, 255, 255)
        font-weight: 200
        line-height: 12px
        height: 12px
        .info
          vertical-align: middle
          display: inline-block
          height: 12px
          margin-left: 4px
    .detail
      width: 40px
      height: 24px
      text-align: center
      line-height: 24px
      font-size: 10px
      color: rgb(255, 255, 255)
      font-weight: 200
      position: absolute
      right: 12px
      bottom: 10px
      background-color: rgba(0, 0, 0, 0.2)
      border-radius: 14px
      .sell-keyboard_arrow_right
        vertical-align: text-bottom
        margin-left: 2px
  .bulletin-wrapper
    height: 28px
    line-height: 28px
    position: relative
    padding: 0 20px 0 12px
    color: rgb(255, 255, 255)
    font-weight: 200
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
    background-color: rgba(7, 17, 27, .2)
    .notice
      display: inline-block
      vertical-align: top
      width: 22px
      height: 12px
      bg-img: 'bulletin'
      background-repeat: no-repeat
      background-size: 22px 12px
      margin-right: 4px
      margin-top: 8px
    .content
      font-size: 10px
      vertical-align: top
    .sell-keyboard_arrow_right
      position: absolute
      right: 12px
      top: 8px
  .background
    width: 100%
    height: 100%
    position: absolute
    z-index: -1
    left: 0
    top: 0
    background-image: url(avatar.jpg)
    background-repeat: no-repeat
    background-size: cover
    filter: blur(5px)
  background-color: rgba(7, 17, 27, .5)
  overflow: hidden
</style>
