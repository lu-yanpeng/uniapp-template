<script setup lang="ts">
withDefaults(
  defineProps<{
    show: boolean
    zIndex: number
  }>(),
  {
    show: false,
    zIndex: 100
  }
)
</script>

<template>
  <wd-overlay :show="show" :z-index="zIndex">
    <view class="wrapper">
      <wd-loading :size="40" />
    </view>
  </wd-overlay>
</template>

<style scoped lang="less">
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>