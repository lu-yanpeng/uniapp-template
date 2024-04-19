<script setup lang="ts">
withDefaults(
  defineProps<{
    imgSrc: Record<string, string>
  }>(),
  {
    imgSrc: () => ({})
  }
)
</script>

<template>
  <view class="flex flex-wrap justify-around">

    <view v-if="!Object.keys(imgSrc).length" class="flex flex-wrap justify-around">
      <view class="mb-3" v-for="i in 6" :key="i">
        <wd-skeleton
          theme="image"
          animation="gradient "
          :row-col="[
              {
                width: '10.125rem',
                height: '10.125rem'
              }
            ]"
        />
      </view>
    </view>

    <view v-for="(value, key) in imgSrc" :key="key" class="pb-1.5 w-[10.125rem]">
      <view class="h-[10.125rem] card-border">
        <image class="w-full h-full" :src="value" mode="aspectFill" :lazy-load="true" />
      </view>

      <view>
        <view class="mt-1.5">
          <text class="text-xs font-bold line-clamp-2">标题123456789标题123456789标题123456789标题123456789标题123456789标题123456789标题123456789</text>
        </view>

        <view class="flex justify-between text-xs">
          <text class="text-[#7f0019]">￥128</text>

          <view class="flex gap-0.5 text-[0.6875rem] text-[#999]">
            <text>月销量</text>
            <text>12</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
