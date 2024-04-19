<script setup lang="ts">
import AsideTitle from '@/components/aside-title/index.vue'
import { useImgSrc } from '@/hooks/getImgSrc'
import { computed } from 'vue'

const { imgSrc } = useImgSrc('video')

// 从静态文件video中找出视频封面和视频
const __filter = (suffix: string) => {
  let _src = ''
  for (const [key, value] of Object.entries(imgSrc.value)) {
    if (key.endsWith(suffix)) {
      _src = value
      break
    }
  }
  return _src
}
// 视频封面
const poster = computed(() => __filter('.jpg'))
// 视频
const videoSrc = computed(() => __filter('.mp4'))
</script>

<template>
  <view>
    <aside-title left-text="视频" right-text="" />

    <view class="w-full aspect-video">
      <video class="w-full h-full aspect-video" :src="videoSrc" :poster="poster" />
    </view>
  </view>
</template>
