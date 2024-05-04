<script setup lang="ts">
import { ref } from 'vue'

defineEmits<{
  submit: [data: Record<string, any>]
}>()

const count = ref(1)
</script>

<template>
  <view class="h-[70vh] grid grid-rows-[1fr,auto]">
    <view class="h-full overflow-y-scroll">
      <view class="flex mt-4 mb-2 mx-4 h-[5.5rem] gap-4">
        <image
          class="aspect-[1/1] w-[5.5rem] h-auto"
        />
        <view class="flex-1 overflow-hidden font-bold">
          <view><text class="text-base text-[#7f0019]">￥358</text></view>
          <view class="pt-1 pb-2.5"><text class="text-xs text-[#585858]">库存2件</text></view>
          <view class="flex text-xs text-[#a0a0a0]">
            <text class="flex-none">已选：</text>
            <text class="flex-none">白；</text>
            <view class="flex-1 truncate">
              <text>SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 尺码 -->
      <view class="px-4 py-4" style="border-bottom: 1px solid #ccc;">
        <view class="mb-4 text-sm font-bold">
          <text>尺码</text>
        </view>

        <view class="flex gap-x-2 flex-wrap gap-y-3">
          <view v-for="i in 2" :key="i" class="py-1 px-2.5 rounded-full min-w-14 text-center text-sm" style="border: 1px solid">
            <text>SSSSSSS</text>
          </view>
        </view>
      </view>

      <!-- 颜色分类 -->
      <view class="px-4 py-4" style="border-bottom: 1px solid #ccc;">
        <view class="mb-4 text-sm font-bold">
          <text>颜色分类</text>
        </view>

        <view class="flex gap-x-2 flex-wrap gap-y-3">
          <view v-for="i in 3" :key="i" class="py-1 px-2.5 rounded-full min-w-14 text-center text-sm" style="border: 1px solid">
            <text>灰色</text>
          </view>
        </view>
      </view>

      <!-- 购买数量 -->
      <view class="px-4 py-4 flex justify-between items-center" style="border-bottom: 1px solid #ccc;">
        <view class="text-sm font-bold">
          <text>购买数量</text>
        </view>

        <wd-input-number v-model="count" />
      </view>

      <!-- 配送方式 -->
      <view class="px-4 py-4">
        <view class="mb-4 text-sm font-bold">
          <text>配送方式</text>
        </view>

        <view>
          <view class="flex text-center text-sm items-center mb-3">
            <view class="w-fit py-1 px-2.5  rounded-full" style="border: 1px solid">
              <text>快递寄送</text>
            </view>
            <view class="ml-3 text-[#999]">
              <text>运费：￥7</text>
            </view>
          </view>

          <view class="w-fit py-1 px-2.5 rounded-full text-center text-sm" style="border: 1px solid">
            <text>门店自提</text>
          </view>
        </view>
      </view>
    </view>

    <view class="w-full py-2.5 px-5">
      <view @click="$emit('submit', {})" class="text-base py-1.5 text-white bg-black rounded-full text-center">确定</view>
    </view>
  </view>
</template>
