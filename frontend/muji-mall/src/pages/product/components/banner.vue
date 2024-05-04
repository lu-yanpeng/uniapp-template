<script setup lang="ts">
import { inject, computed, unref } from 'vue'
import type { Ref } from 'vue'
import { productSymbol } from '../symbol-keys'
import type { Product } from '@/API/products'
import { SERVER_ADDRESS } from '@/constants'

const productData = inject(productSymbol, null) as Ref<Product['attributes'] | null> | null
const productBanner = computed(() => {
  const data = unref(productData)
  if (!data) {
    return []
  }
  const _: string[] = []
  data.banner.images.map((imgs) => {
    imgs.img.data.map((i) => {
      _.push(SERVER_ADDRESS + i.attributes.url)
    })
  })
  return _
})
// 点击轮播图预览图片
const previewImage = (index: number) => {
  uni.previewImage({
    urls: productBanner.value,
    current: index,
    indicator: 'default',
    loop: true
  })
}
</script>

<template>
  <view class="aspect-[1/1] w-full">
    <swiper
      class="w-full h-full"
      :indicator-dots="true"
      :autoplay="true"
      :circular="true"
      indicator-color="rgba(88, 88, 88, 0.3)"
      indicator-active-color="rgb(88, 88, 88)"
    >
      <swiper-item v-for="(src, key) in productBanner" :key="key">
        <image
          class="w-full h-full"
          :src="src"
          mode="aspectFill"
          :lazy-load="true"
          @click="previewImage(key)"
        />
      </swiper-item>
    </swiper>
  </view>
</template>
