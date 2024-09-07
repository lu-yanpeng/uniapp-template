<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <view class="flex justify-center items-center px-[17px] py-[18px] bg-white">
    <wd-checkbox :model-value="true" checked-color="#7f0019" size="large"></wd-checkbox>
    <image class="w-[110px] h-[110px] bg-amber-600 mr-3" />
    <view class="flex-1 self-start">
      <view class="text-xs text-[#1f1f21] line-clamp-2">男士 水洗 粗棉线 一字领 九分袖 T恤</view>
      <view class="flex justify-between items-center my-2">
        <text class="text-[#7f0019] text-xs">¥198</text>
        <wd-input-number v-model="count" disable-input />
      </view>
      <view class="bg-[#f2f2f2] px-[6px] py-[4px] w-fit flex items-center rounded-full">
        <text class="text-xs text-[#999] line-clamp-2">黑色条纹；S</text>
        <image class="flex-none w-[8px] h-[5px] ml-[6px] [transform:translateY(2px)]" src="@/pages/cart/img/dg.png" />
      </view>
    </view>
  </view>
</template>

<style scoped lang="less">

</style>