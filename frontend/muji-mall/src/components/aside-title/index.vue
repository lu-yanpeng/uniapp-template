<script setup lang="ts">
withDefaults(
  defineProps<{
    leftText: string
    rightText?: string
  }>(),
  {
    leftText: '标题',
    rightText: '查看更多'
  }
)

defineEmits<{
  more: []
}>()
</script>

<template>
  <view class="flex font-bold justify-between items-baseline my-4 px-1.5 lg:px-0">
    <text class="text-lg">{{ leftText }}</text>
    <text class="text-sm text-[#60b3fa]" @click="$emit('more')">{{ rightText }}</text>
  </view>
</template>
