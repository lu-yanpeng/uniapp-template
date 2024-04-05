<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref, computed } from 'vue'
import { SERVER_ADDRESS } from '@/constants'

onLoad(async () => {
  try {
    const response = await uni.request({
      url: `${SERVER_ADDRESS}/drive/list`,
      data: {
        name: 'banner'
      }
    })
    fileNameList.value = response.data.data.data
  } catch (e) {
    console.log('异常')
  }
})

const fileNameList = ref<string[]>([])
const imgSrc = computed(() => {
  return fileNameList.value.map((name) => `${SERVER_ADDRESS}/static/banner/${name}`)
})
</script>

<template>
  <view class="swiper-wrap">
    <swiper
      class="swiper"
      :circular="true"
      :indicator-dots="true"
      :autoplay="true"
      :interval="3000"
    >
      <swiper-item v-for="(src, index) in imgSrc" :key="src">
        <!-- #ifdef WEB -->
        <img class="banner-img" :src="src" loading="lazy" :alt="'轮播图' + index" draggable="false" />
        <!-- #endif -->

        <!-- #ifdef MP-WEIXIN -->
        <image class="banner-img" :src="src" />
        <!-- #endif -->
      </swiper-item>
    </swiper>
  </view>
</template>

<style scoped lang="less">
.swiper-wrap {
  width: 100%;
  aspect-ratio: 8 / 5;

  .swiper {
    height: 100%;

    .banner-img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
