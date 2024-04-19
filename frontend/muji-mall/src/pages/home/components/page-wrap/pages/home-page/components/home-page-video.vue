<script setup lang="ts">
import AsideTitle from '@/components/aside-title/index.vue'
import { useImgSrc } from '@/hooks/getImgSrc'

const { imgSrc } = useImgSrc('video')
</script>

<template>
  <view>
    <aside-title left-text="视频" right-text="" />

    <view class="w-full aspect-video">
      <video class="w-full h-full aspect-video" :src="Object.values(imgSrc)[0]" />
    </view>
  </view>
</template>
