<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AsideTitle from '@/components/aside-title/index.vue'
import { getVideo } from '@/API/home/video'
import { SERVER_ADDRESS } from '@/constants'

const videoData = ref<{
  videoSrc: string
  poster: string
}>({
  videoSrc: '',
  poster: ''
})
onMounted(async () => {
  try {
    const {
      data: {
        attributes: { video, poster }
      }
    } = await getVideo()

    if (video && poster) {
      videoData.value = {
        videoSrc: `${SERVER_ADDRESS}${video.data.attributes.url}`,
        poster: `${SERVER_ADDRESS}${poster.data.attributes.url}`
      }
    }
  } catch (e) {
    console.log('未知错误 video')
  }
})
</script>

<template>
  <view>
    <aside-title left-text="视频" right-text="" />

    <view class="w-full aspect-video">
      <video
        class="w-full h-full aspect-video"
        :src="videoData.videoSrc"
        :poster="videoData.poster"
      />
    </view>
  </view>
</template>
