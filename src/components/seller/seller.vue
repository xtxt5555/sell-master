<template>
  <cube-scroll
    class="seller"
    :options="scrollOptions"
  >
    <div class="seller-content">
      <div class="overview">
        <h2 class="title">{{seller.name}}</h2>
        <div class="desc">
          <star class="star" :size=36 :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h3>起送价</h3>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h3>商家配送</h3>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h3>平均配送时间</h3>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favourite" @click="toggleFavourite">
          <span class="sell-favorite" :class="{active: favourite}"></span>
          <span class="text">{{favouriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h2 class="title">公告与活动</h2>
        <p class="content">{{seller.bulletin}}</p>
        <ul class="supports">
          <li
            v-show="seller.supports"
            v-for="(item, index) in seller.supports"
            :key="index"
            class="support-item"
          >
            <support-ico :size=2 :support="item.type" class="ico"></support-ico>
            <span class="info">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h2 class="title">商家实景</h2>
        <cube-scroll
          v-show="seller.pics"
          :options="scrollOptionsPic"
          class="pics-wrapper"
        >
          <ul>
            <li
              class="pic"
              v-for="(pic, index) in seller.pics"
              :key="index"
            >
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </cube-scroll>
      </div>
      <split></split>
      <div class="seller-info" v-show="seller.infos">
        <h2 class="title">商家信息</h2>
        <ul>
          <li v-for="(item, index) in seller.infos" :key="index" class="info-item">
            {{item}}
          </li>
        </ul>
      </div>
    </div>
  </cube-scroll>
</template>

<script lang="ecmascript-6">
import Star from 'components/star/star'
import Split from 'components/split/split'
import SupportIco from 'components/support-ico/support-ico'
import { saveToLocal, loadFromLocal } from 'common/js/storage'

export default {
  components: {
    Star,
    Split,
    SupportIco
  },
  data() {
    return {
      scrollOptions: {
        click: false,
        drectionLockThreshold: 0
      },
      scrollOptionsPic: {
        scrollX: true,
        scrollY: false,
        stopPropagation: true,
        directionLockThreshold: 0
      },
      favourite: false
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
    },
    favouriteText() {
      return this.favourite ? '已收藏' : '收藏'
    }
  },
  methods: {
    toggleFavourite() {
      this.favourite = !this.favourite
      saveToLocal(this.seller.id, 'favourite', this.favourite)
    }
  },
  created() {
    this.favourite = loadFromLocal(this.seller.id, 'favourite', false)
  }
}
</script>

<style lang="stylus" scoped>
  .seller
    height: 100%
    .seller-content
      .title
        font-size: 14px
        color: rgb(7, 17, 27)
        line-height: 14px
        margin-bottom: 8px
      .overview
        margin: 18px
        position: relative
        .desc
          margin-bottom: 18px
          .star
            vertical-align: top
            margin-right: 8px
            >>>.star-item
              margin-right: 8px
          .text
            vertical-align: top
            font-size: 10px
            color: rgb(77, 85, 93)
            line-height: 18px
            margin-right: 12px
            &:last-child
              margin-right: 0
        .remark
          display: flex
          text-align: center
          padding: 18px 0
          .block
            flex: 1
            border-right: 1px solid rgba(7, 17, 27, 0.1)
            &:last-child
              border-right: none
            h3
              font-size: 10px
              color: rgb(147, 153, 159)
              line-height: 10px
            .content
              font-size: 10px
              line-height: 10px
              .stress
                font-size: 24px
                color: rgb(7, 17, 27)
                line-height: 24px
        .favourite
          width: 60px
          position: absolute
          top: 0
          right: 0
          text-align: center
          font-size: 0
          .sell-favorite
            font-size: 24px
            color: rgb(77, 85, 93)
            line-height: 24px
            display: block
            margin-bottom: 8px
            &.active
              color: rgb(240, 20, 20)
          .text
            font-size: 10px
            color: rgb(77, 85, 93)
            line-height: 10px
      .bulletin
        padding: 18px 18px 0
        .content
          white-space: normal
          font-size: 12px
          color: rgb(240, 20, 20)
          line-height: 24px
          font-weight: 200
          padding: 0 12px 16px
          border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .supports
          .support-item
            padding: 16px 12px
            border-bottom: 1px solid rgba(7, 17, 27, 0.1)
            &:last-child
              border-bottom: none
            .ico
              vertical-align: top
              margin-right: 6px
            .info
              vertical-align: top
              font-size: 12px
              color: rgb(7, 17, 27)
              font-weight: 200
              line-height: 16px
      .pics
        margin: 18px
        overflow: hidden
        .pics-wrapper
          display: flex
          align-items: center
          .pic
            display: inline-block
            width: 120px
            height: 90px
            margin-right: 8px
      .seller-info
        padding: 18px 18px 0
        .info-item
          white-space: normal
          padding: 16px 12px
          border-bottom: 1px solid rgba(7, 17, 27, 0.1)
</style>
