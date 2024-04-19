<script setup lang="ts">
import AsideTitle from '@/components/aside-title/index.vue'
import { useImgSrc } from '@/hooks/getImgSrc'

const { imgSrc } = useImgSrc('special')
</script>

<template>
  <view>
    <aside-title left-text="特集" />

    <view
      class="flex flex-wrap justify-around lg:grid lg:[grid-template-columns:repeat(auto-fill,minmax(280px,1fr))] lg:[grid-auto-rows:175px] lg:gap-x-6"
    >
      <view v-if="!Object.keys(imgSrc).length" class="flex flex-wrap justify-around">
        <view class="mb-3" v-for="i in 6" :key="i">
          <wd-skeleton
            theme="image"
            animation="gradient "
            :row-col="[
              {
                width: '10.125rem',
                height: '7.5rem'
              }
            ]"
          />
        </view>
      </view>

      <view
        v-for="(value, key, index) in imgSrc"
        :key="key"
        class="w-[10.125rem] h-[7.5rem] mb-3 overflow-hidden card-border lg:w-full lg:h-full lg:mb-0"
        :class="{ 'lg:hidden': index === 5 || index === 4 }"
        style="box-shadow: -2px 2px 6px 2px #ccc"
      >
        <image :src="value" class="w-full h-full" mode="aspectFill" :lazy-load="true" />
      </view>
    </view>
  </view>
</template>
