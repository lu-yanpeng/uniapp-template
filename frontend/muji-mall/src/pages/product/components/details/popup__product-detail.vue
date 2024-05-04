<script setup lang="ts">
defineEmits<{
  submit: []
}>()
</script>

<template>
  <view class="max-h-[60vh] grid grid-rows-[auto,1fr,auto]">
    <view class="text-center py-3.5">
      <text class="text-base font-bold">产品参数</text>
    </view>

    <view class="overflow-y-scroll">
      <view v-for="i in 10" :key="i" class="px-4 py-3.5 flex text-sm" style="border-bottom: 1px solid #ccc;">
        <view class="w-[5.5rem] flex-none"><text class="text-[#585858]">尺码：</text></view>

        <view class="flex-1 overflow-hidden">
          <text class="break-words">85g</text>
        </view>
      </view>
    </view>

    <view class="w-full py-2.5 px-5">
      <view @click="$emit('submit')" class="text-base py-1.5 text-white bg-black rounded-full text-center">确定</view>
    </view>
  </view>
</template>
