<template>
  <div class="bubble">
    {{num}}
  </div>
</template>

<script lang="ecmascript-6">
export default {
  props: {
    num: {
      type: Number
    }
  }
}
</script>

<style lang="stylus">
  .bubble
    width: 24px
    height: 16px
    font-size: 9px
    line-height: 16px
    font-weight: 700
    border-radius: 6px
    background-color: rgb(240, 20, 20)
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
    text-align: center
    color: rgb(255, 255, 255)
</style>