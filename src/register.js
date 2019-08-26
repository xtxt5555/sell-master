import { createAPI } from 'cube-ui'
import Vue from 'vue'
import HeadDetail from 'components/head-detail/head-detail'
import ShopCartList from 'components/shop-cart-list/shop-cart-list'
import ShopCartSticky from 'components/shop-cart-sticky/shop-cart-sticky'
import Food from 'components/food/food'

createAPI(Vue, HeadDetail)
createAPI(Vue, ShopCartList)
createAPI(Vue, ShopCartSticky)
createAPI(Vue, Food)
