<template>
  <div class="tab">
    <cube-tab-bar
      v-model="selectedLabel"
      :data="tabs"
      :showSlider = "true"
      :useTransition="false"
      ref="tabBar">
    </cube-tab-bar>
    <div class="slide-wrapper">
      <cube-slide :initial-index="index"
                  :loop="false"
                  :auto-play="false"
                  :showDots="false"
                  @change="onChange"
                  @scroll="onScroll"
                  :options="this.scrollOptions"
                  ref="slide">
        <cube-slide-item v-for="(tab, index) in tabs" :key="index">
          <component :is="tab.component" :data="tab.seller" ref="component"></component>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script lang="ecmascript-6">
export default {
  props: {
    tabs: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data () {
    return {
      index: 0,
      scrollOptions: {
        listenScroll: true,
        probeType: 3,
        directionLockThreshold: 0
      }
    }
  },
  mounted() {
    this.onChange(this.index)
  },
  methods: {
    onChange(current) {
      this.index = current
      const component = this.$refs.component[current]
      component.fetch && component.fetch()
    },
    onScroll(pos) {
      const tabBarWidth = this.$refs.tabBar.$el.clientWidth
      const slideWidth = this.$refs.slide.slide.scrollerWidth
      const transform = -pos.x / slideWidth * tabBarWidth
      this.$refs.tabBar.setSliderTransform(transform)
    }
  },
  computed: {
    selectedLabel: {
      get() {
        return this.tabs[this.index].label
      },
      set(newValue) {
        this.index = this.tabs.findIndex((item) => {
          return item.label === newValue
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/index.styl'
.tab
  .cube-tab-bar
    box-sizing: border-box
  >>> .cube-tab
    padding: 10px 0
  >>> .cube-scroll-nav-bar-item.cube-scroll-nav-bar-item_active
    background-color: #FFF
  display: flex
  flex-direction: column
  height: 100%
  .slide-wrapper
    flex: 1
    overflow: hidden
</style>
