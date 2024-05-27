<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getBannerList } from '@/API/home/banner'
import { SERVER_ADDRESS } from '@/constants'

const bannerList = ref<
  {
    title: string
    componentId: string
    imgSrc: string
  }[]
>([])
onMounted(async () => {
  try {
    const { data } = await getBannerList()

    data.map((item) => {
      const { attributes } = item
      bannerList.value.push({
        title: attributes.title,
        componentId: attributes.activity_component.data.attributes.component_id,
        imgSrc: SERVER_ADDRESS + attributes.cover_img.data.attributes.url
      })
    })
  } catch (e) {
    console.log()
  }
})
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
      <swiper-item v-for="(value, key) in bannerList" :key="key">
        <navigator
          class="w-full h-full"
          :url="`/pages/activity/activity?component-id=${value.componentId}&title=${value.title}`"
        >
          <image :src="value.imgSrc" class="w-full h-full" mode="aspectFill" :lazy-load="true" />
        </navigator>
      </swiper-item>
    </swiper>
  </view>
</template>
