<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    category: {
      title: string
      coverSrc: string
    }[]
  }>(),
  {}
)
</script>

<template>
  <view>
    <view class="text-sm font-bold px-1.5 lg:px-0">
      <text>{{ title }}</text>
    </view>

    <view class="grid grid-cols-[repeat(auto-fill,minmax(3.75rem,1fr))] auto-rows-auto gap-x-5 justify-items-center py-4">
      <view v-for="(value, key) in category" :key="key" class="grid justify-items-center w-[3.75rem]">
        <view class="w-full aspect-[1/1]">
          <image :src="value.coverSrc" mode="aspectFill" class="w-full h-full" :lazy-load="true" />
        </view>

        <view class="py-3.5 max-w-full">
          <text class="font-bold line-clamp-1 text-[0.6875rem]">{{ value.title }}</text>
        </view>
      </view>
    </view>
  </view>
</template>
