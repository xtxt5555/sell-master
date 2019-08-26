<template>
  <div id="app" :class="{blur: showDetail}">
    <v-header :seller="seller" :changeShowDetail="changeShowDetail"></v-header>
    <div class="tab-wrapper">
      <tab :tabs="tabs"></tab>
    </div>
  </div>
</template>

<script lang="ecmascript-6">
import { getSeller } from 'api/index'
import './register'
import './cube-ui'
import VHeader from 'components/v-header/v-header'
import Tab from 'components/tab/tab'
import Goods from 'components/goods/goods'
import Ratings from 'components/ratings/ratings'
import Seller from 'components/seller/seller'

import qs from 'query-string'

export default {
  name: 'app',
  data() {
    return {
      seller: {
        id: qs.parse(location.search).id
      },
      showDetail: false
    }
  },
  computed: {
    tabs() {
      return [
        {
          label: '商品',
          component: Goods,
          seller: this.seller
        },
        {
          label: '评价',
          component: Ratings,
          seller: this.seller
        },
        {
          label: '商家',
          component: Seller,
          seller: this.seller
        }
      ]
    }
  },
  components: {
    VHeader,
    Tab
  },
  methods: {
    _getSeller() {
      getSeller({ id: this.seller.id }).then(data => {
        this.seller = data
      })
    },
    changeShowDetail(bool) {
      this.showDetail = bool
    }
  },
  created() {
    this._getSeller()
  }
}
</script>
<style lang="stylus">
  @import 'common/stylus/index.styl'
  #app
    width: 100%
    &.blur
      filter: blur(5px)
    .tab-wrapper
      position: fixed
      top: 134px
      left: 0
      right: 0
      bottom: 0
</style>
