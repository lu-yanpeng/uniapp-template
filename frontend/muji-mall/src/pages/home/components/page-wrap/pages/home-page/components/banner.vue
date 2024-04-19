<script setup lang="ts">
import { useImgSrc } from '@/hooks/getImgSrc'

const { imgSrc } = useImgSrc('banner')
</script>

<template>
  <view class="w-full aspect-[125/78]">
    <swiper
      class="w-full h-full"
      :indicator-dots="true"
      indicator-color="rgba(88, 88, 88, 0.3)"
      indicator-active-color="rgb(88, 88, 88)"
      :autoplay="true"
      :circular="true"
    >
      <swiper-item v-for="(value, key) in imgSrc" :key="key">
        <image :src="value" class="w-full h-full" mode="aspectFill" :lazy-load="true" />
      </swiper-item>
    </swiper>
  </view>
</template>
