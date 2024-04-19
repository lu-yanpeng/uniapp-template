<script setup lang="ts">
// 这个组件应该用在微信小程序中
import { inject } from 'vue'
import type { Ref } from 'vue'
import { WxNavHeightSymbol, WxMenuButtonSymbol } from '@/symbol-keys'

const wxNavHeight = inject(WxNavHeightSymbol) as Ref<number>
const wxMenuButton = inject(WxMenuButtonSymbol) as Ref<number>
</script>

<template>
  <view class="custom-nav">
    <view class="nav-content">
      <view><slot name="left" /></view>
      <view><slot name="center" /></view>
      <view><slot name="right" /></view>
    </view>
  </view>
</template>

<style scoped lang="less">
.custom-nav {
  height: v-bind("wxNavHeight + 'px'");
  display: grid;
  align-items: flex-end;

  .nav-content {
    height: v-bind("wxMenuButton + 'px'");
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
  }
}
</style>
