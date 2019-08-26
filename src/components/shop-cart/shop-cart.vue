<template>
  <div class="shop-cart">
    <div class="content" @click="toggleList">
      <div class="content-left" :class="{hasFood: this.totalCount}">
        <div class="logo-wrapper">
          <div class="logo">
            <i class="sell-shopping_cart"></i>
          </div>
        </div>
        <div class="bubble-wrapper" v-show="totalCount">
          <bubble :num="totalCount"></bubble>
        </div>
        <div class="price">￥{{totalPrice}}</div>
        <div class="desc">另需配送费{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="{enough: totalPrice >= minPrice}" @click="pay">
          {{payDesc}}
        </div>
      </div>
    </div>
    <div class="ball-container">
      <div v-for="(ball, index) in balls" :key="index">
        <transition
          @before-enter="beforeDrop"
          @enter="dropping"
          @after-enter="afterDrop"
        >
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ecmascript-6">
import Bubble from 'components/bubble/bubble'

const BALL_LEN = 10
function createBalls() {
  let ret = []
  for (let i = 0; i < BALL_LEN; i++) {
    ret.push({
      show: false
    })
  }
  return ret
}

export default {
  components: {
    Bubble
  },
  data() {
    return {
      balls: createBalls(),
      listFold: this.fold
    }
  },
  props: {
    selectFoods: {
      type: Array,
      default() {
        return []
      }
    },
    deliveryPrice: {
      type: Number,
      default() {
        return 0
      }
    },
    minPrice: {
      type: Number,
      default() {
        return 0
      }
    },
    fold: {
      type: Boolean,
      default() {
        return true
      }
    },
    sticky: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  computed: {
    totalPrice() {
      let total = 0
      this.selectFoods.forEach((good) => {
        total += good.count * good.price
      })
      return total
    },
    totalCount() {
      let count = 0
      this.selectFoods.forEach((good) => {
        count += good.count
      })
      return count
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差${diff}元起送`
      } else {
        return '去结算'
      }
    },
    payClass() {
      return this.totalPrice >= this.minPrice
    }
  },
  methods: {
    drop(el) {
      for (let i = 0; i < BALL_LEN; i++) {
        const ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
        }
        this.dropBalls.push(ball)
        return
      }
    },
    beforeDrop(el) {
      const ball = this.dropBalls[this.dropBalls.length - 1]
      const rect = ball.el.getBoundingClientRect()
      const x = rect.left - 32
      const y = -(window.innerHeight - rect.top - 22)
      el.style.display = ''
      el.style.transform = el.style.webkitTransform = `translateY(${y}px)`
      const inner = el.getElementsByClassName('inner-hook')[0]
      inner.style.transform = inner.style.webkitTransform = `translateX(${x}px)`
    },
    dropping(el, done) {
      this._reflow = document.body.offsetHeight
      el.style.transform = el.style.webkitTransform = `translateY(0)`
      const inner = el.getElementsByClassName('inner-hook')[0]
      inner.style.transform = inner.style.webkitTransform = `translateX(0)`
      el.addEventListener('transitionend', done)
    },
    afterDrop(el) {
      const ball = this.dropBalls.shift()
      ball.show = false
      el.style.display = 'none'
    },
    toggleList() {
      if (this.listFold) {
        if (!this.totalCount) return
        this.listFold = false
        this._showShopCartList()
        this._showShopCartSticky()
      } else {
        this.listFold = true
        this._hideShopCartList()
      }
    },
    _showShopCartList() {
      this.shopCartListComp = this.shopCartListComp || this.$createShopCartList({
        $props: {
          selectFoods: 'selectFoods'
        },
        $events: {
          hide: () => {
            this.listFold = true
          },
          leave: () => {
            this._hideShopCartSticky()
          },
          add: (el) => {
            this.shopCartStickyComp.drop(el)
          }
        }
      })
      this.shopCartListComp.show()
    },
    _hideShopCartList() {
      const comp = this.sticky ? this.$parent.list : this.shopCartListComp
      comp.hide && comp.hide()
    },
    _showShopCartSticky() {
      this.shopCartStickyComp = this.shopCartStickyComp || this.$createShopCartSticky({
        $props: {
          selectFoods: 'selectFoods',
          deliveryPrice: 'deliveryPrice',
          minPrice: 'minPrice',
          fold: 'listFold',
          list: this.shopCartListComp
        }
      })
      this.shopCartStickyComp.show()
    },
    _hideShopCartSticky() {
      this.shopCartStickyComp.hide()
    },
    pay(eve) {
      if (this.totalPrice < this.minPrice) return
      this.$createDialog({
        type: 'confirm',
        title: '结算',
        content: `您需要支付共￥${this.totalPrice}元`
      }).show()
      eve.stopPropagation()
    }
  },
  created() {
    this.dropBalls = []
  },
  watch: {
    fold(newVal) {
      this.listFold = newVal
    },
    totalCount(newVal) {
      if (!this.listFold && !this.totalCount) {
        this._hideShopCartList()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import 'common/stylus'
  .shop-cart
    padding-left: 12px
    height: 48px
    background-color: #141d27
    .content
      height: 100%
      display: flex
      .content-left
        position: relative
        flex: 1
        .logo-wrapper, .price, .desc
          display: inline-block
        .logo-wrapper
          box-sizing: border-box
          width: 56px
          height: 56px
          padding: 6px
          border-radius: 29px
          background-color: #141d27
          margin: -10px 15px 0 0
          .logo
            background-color: rgba(255, 255, 255, 0.2)
            width: 44px
            height: 44px
            border-radius: 22px
            text-align: center
            .sell-shopping_cart
              font-size: 24px
              color: rgba(255, 255, 255, 0.4)
              line-height: 44px
        .bubble-wrapper
          position: absolute
          left: 36px
          top: -8px
        .price
          font-size: 16px
          color: rgba(255, 255, 255, 0.4)
          font-weight: 700
          line-height: 48px
          padding-right: 12px
        .desc
          font-size: 12px
          color: rgba(255, 255, 255, 0.4)
          font-weight: 200
          line-height: 24px
          padding-left: 12px
          border-left: 1px solid rgba(255, 255, 255, 0.2)
        &.hasFood
          .logo
            background-color: rgb(0, 160, 220)
            .sell-shopping_cart
              color: rgb(255, 255, 255)
          .price
            color: rgb(255, 255, 255)
      .content-right
        flex: 0 0 105px
        .pay
          font-size: 16px
          color: rgba(255, 255, 255, 0.4)
          font-weight: 700px
          line-height: 48px
          text-align: center
          &.enough
            background-color: #00b43c
            color: rgb(255, 255, 255)
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background-color: rgb(0, 160, 220)
          transition: all 0.4s linear
</style>
