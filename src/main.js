import Vue from 'vue'
import './cube-ui'
import App from './app'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
