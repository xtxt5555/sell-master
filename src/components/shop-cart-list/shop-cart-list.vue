<template>
  <transition name="fade">
    <cube-popup
      v-show="visible"
      :mask-closable="true"
      :z-index=90
      position="bottom"
      type="shop-cart-list"
      @mask-click="maskClick"
    >
      <transition
        name="move"
        @after-leave="onLeave"
      >
        <div v-show="visible">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <cube-scroll class="list-content" ref="listContent">
            <ul>
              <li
                class="food"
                v-for="food in selectFoods"
                :key="food.name"
              >
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price * food.count}}</span>
                </div>
                <div class="cart-control-wrapper">
                  <cart-control @add="onAdd" :food="food"></cart-control>
                </div>
              </li>
            </ul>
          </cube-scroll>
        </div>
      </transition>
    </cube-popup>
  </transition>
</template>

<script lang="ecmascript-6">
import CartControl from 'components/cart-control/cart-control'
import popupMixin from 'common/js/popupMixin'
const EVENT_LEAVE = 'leave'
const EVENT_SHOW = 'show'
const EVENT_ADD = 'add'

export default {
  name: 'shop-cart-list',
  mixins: [popupMixin],
  components: {
    CartControl
  },
  props: {
    selectFoods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    maskClick() {
      this.hide()
    },
    onLeave() {
      this.$emit(EVENT_LEAVE)
    },
    empty() {
      this.dialogComp = this.dialogComp || this.$createDialog({
        type: 'confirm',
        content: '清空购物车吗？',
        $events: {
          confirm: () => {
            this.selectFoods.forEach((food) => {
              food.count = 0
            })
            this.hide()
          }
        }
      })
      this.dialogComp.show()
    },
    onAdd(target) {
      this.$emit(EVENT_ADD, target)
    }
  },
  created() {
    this.$on(EVENT_SHOW, () => {
      this.$nextTick(() => {
        this.$refs.listContent.refresh()
      })
    })
  }
}
</script>

<style lang="stylus" scoped>
  .cube-shop-cart-list
    bottom: 48px
    &.fade-enter, &.fade-leave-active
      opacity: 0
    &.fade-enter-active, &.fade-leave-active
      transition: all .3s ease-in-out
    .move-enter, .move-leave-active
      transform: translate3d(0, 100%, 0)
    .move-enter-active, .move-leave-active
      transition: all .3s ease-in-out
    .list-header
      height: 40px
      line-height: 40px
      padding: 0 18px
      background: #f3f5f7
      .title
        float: left
        font-size: 14px
        color: rgb(7, 17, 27)
      .empty
        float: right
        font-size: 14px
        color: rgb(7, 17, 27)
    .list-content
      padding: 0 18px
      max-height: 217px
      overflow: hidden
      background: $color-white
      .food
        position: relative
        padding: 12px 0
        box-sizing: border-box
        .name
          line-height: 24px
          font-size: 14px
          color: rgb(7, 17, 27)
        .price
          position: absolute
          right: 90px
          bottom: 12px
          line-height: 24px
          font-weight: 700
          font-size: 14px
          color: rgb(240, 20, 20)
        .cart-control-wrapper
          position: absolute
          right: 0
          bottom: 12px
</style>
