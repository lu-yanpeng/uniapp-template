<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string
  }>(),
  {
    label: '选择'
  }
)
defineEmits<{
  choice: []
}>()
</script>

<template>
  <view class="flex items-center">
    <text class="flex-none pr-5 whitespace-nowrap text-base font-bold">{{ label }}</text>

    <view @click="$emit('choice')" class="flex flex-1 items-center justify-between">
      <view
        class="text-xs text-[#585858] flex-1 overflow-ellipsis overflow-hidden max-w-[280px]"
        ><slot
      /></view>
      <image src="@/pages/product/img/right.png" class="w-[0.4375rem] h-auto aspect-[7/12]" />
    </view>
  </view>
</template>
