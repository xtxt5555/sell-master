<template>
  <div class="goods">
    <div class="scroll-nav-wrapper">
      <cube-scroll-nav
        :side="true"
        :data="goods"
        :options="scrollOptions"
        v-if="goods.length"
      >
        <template v-slot:bar="{labels, txts, current}">
          <cube-scroll-nav-bar
            direction="vertical"
            :labels="labels"
            :txts="barTxts"
            :current="current"
          >
            <template v-slot:default="{txt}">
              <div class="txt">
                <support-ico
                  class="support-ico"
                  v-if="txt.type >= 1"
                  :support="txt.type"
                  :size=1
                ></support-ico>
                <span>{{txt.name}}</span>
                <span class="num"><bubble v-if="txt.count" :num="txt.count"></bubble></span>
              </div>
            </template>
          </cube-scroll-nav-bar>
        </template>
        <cube-scroll-nav-panel
          v-for="good in goods"
          :key="good.name"
          :label="good.name"
          :title="good.name"
        >
          <ul>
            <li v-for="food in good.foods" :key="food.name" class="food-item" @click="selectFood(food)">
              <div class="icon">
                <img :src="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="description">{{food.description}}</p>
                <div class="extra">
                  <span>月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
              <div class="cart-control-wrapper">
                <cart-control @add="onAdd" :food="food"></cart-control>
              </div>
            </li>
          </ul>
        </cube-scroll-nav-panel>
      </cube-scroll-nav>
    </div>
    <div class="shop-cart-wrapper">
      <shop-cart :deliveryPrice="seller.deliveryPrice"
                 :minPrice="seller.minPrice"
                 :selectFoods="selectFoods"
                 ref="shopCart"
      ></shop-cart>
    </div>
  </div>
</template>

<script lang="ecmascript-6">
import { getGoods } from 'api'
import CartControl from 'components/cart-control/cart-control'
import ShopCart from 'components/shop-cart/shop-cart'
import SupportIco from 'components/support-ico/support-ico'
import Bubble from 'components/bubble/bubble'

export default {
  components: {
    CartControl,
    ShopCart,
    SupportIco,
    Bubble
  },
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      goods: [],
      selectedFood: {},
      scrollOptions: {
        click: false,
        drectionLockThreshold: 0
      }
    }
  },
  computed: {
    seller() {
      return this.data
    },
    selectFoods() {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) foods.push(food)
        })
      })
      return foods
    },
    barTxts() {
      let ret = []
      this.goods.forEach((good) => {
        const { name, type, foods } = good
        let count = 0
        foods.forEach((food) => {
          count += food.count || 0
        })
        ret.push({
          type,
          name,
          count
        })
      })
      return ret
    }
  },
  methods: {
    fetch() {
      if (!this.fetched) {
        this.fetched = true
        getGoods({ id: this.seller.id }).then((data) => {
          this.goods = data
        })
      }
    },
    onAdd(el) {
      this.$refs.shopCart.drop(el)
    },
    selectFood(food) {
      this.selectedFood = food
      this._showFood()
      this._showShopCartSticky()
    },
    _showFood() {
      this.foodComp = this.foodComp || this.$createFood({
        $props: {
          food: 'selectedFood'
        },
        $events: {
          leave: () => {
            this.shopCartStickyComp.hide()
          },
          add: (el) => {
            this.shopCartStickyComp.drop(el)
          }
        }
      })
      this.foodComp.show()
    },
    _showShopCartSticky() {
      this.shopCartStickyComp = this.shopCartStickyComp || this.$createShopCartSticky({
        $props: {
          selectFoods: 'selectFoods',
          deliveryPrice: this.seller.deliveryPrice,
          minPrice: this.seller.minPrice,
          fold: true
        }
      })
      this.shopCartStickyComp.show()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .goods
    position: relative
    text-align: left
    height: 100%
    .scroll-nav-wrapper
      position: absolute
      width: 100%
      top: 0
      left: 0
      bottom: 48px
    >>> .cube-scroll-nav-bar
      width: 80px
      white-space: normal
      overflow: hidden
    >>> .cube-scroll-nav-bar-item
      padding: 0 12px
      display: flex
      align-items: center
      height: 56px
      line-height: 14px
      font-size: 12px
      font-weight: 200
      color: rgb(24, 20, 20)
      background: #f3f5f7
      .txt
        flex: 1
        position: relative
        .num
          position: absolute
          right: -8px
          top: -10px
        .support-ico
          display: inline-block
          vertical-align: top
    >>> .cube-scroll-nav-panel-title
      position: relative
      padding-left: 16px
      height: 26px
      font-size: 12px
      color: rgb(147, 153, 159)
      line-height: 26px
      background: #f3f5f7
      &:after
        content: ''
        dispaly: block
        position: absolute
        top: 0
        left: 0
        height: 26px
        border-left: 2px solid #d9dde1
    >>> .cube-scroll-nav-panel
      .food-item
        padding: 18px
        position: relative
        .icon
          width: 57px
          height: 57px
          display: inline-block
          vertical-align: top
        .content
          display: inline-block
          vertical-align: top
          margin: 2px 0 0 10px
          .name
            font-size: 14px
            color: rgb(7, 17, 27)
            line-height: 14px
            margin-bottom: 8px
          .description
            font-size: 10px
            color: rgb(147, 153, 159)
            line-height: 10px
            margin-bottom: 8px
          .extra
            height: 10px
            span
              vertical-align: top
              font-size: 10px
              color: rgb(147, 153, 159)
              line-height: 10px
              &:first-child
                margin-right: 12px
          .price
            .now
              font-size: 10px/ 14px
              color: rgb(240, 20, 20)
              font-weight: normal/ 700
              line-height: 24px
            .old
              font-size: 10px
              color: rgb(147, 153, 159)
              font-weight: normal/ 700
              line-height: 24px
              text-decoration: line-through
        .cart-control-wrapper
          position: absolute
          bottom: 18px
          right: 18px
    .shop-cart-wrapper
      width: 100%
      position: absolute
      left: 0
      bottom: 0
      z-index: 100
</style>
