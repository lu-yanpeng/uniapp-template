<script setup lang="ts"></script>

<template>
  <view class="px-[1.125rem] pb-2.5" style="border-top: 0.375rem solid #f2f2f2">
    <view class="py-3.5">
      <text class="font-bold">推荐商品</text>
    </view>

    <view
      class="grid [grid-template-columns:repeat(auto-fill,minmax(6.5rem,1fr))] justify-items-center gap-y-1.5"
    >
      <view
        v-for="i in 6"
        :key="i"
        class="text-xs w-[6.5rem] font-bold grid [grid-template-rows:auto_1fr_auto]"
      >
        <view class="aspect-[1/1] w-full" style="border: 1px solid #ccc"></view>

        <view class="mt-1.5">
          <text class="line-clamp-2 break-words">女式 无侧缝 双层纱织睡衣</text>
        </view>

        <view>
          <text class="text-[#7f0019]">¥298</text>
        </view>
      </view>
    </view>
  </view>
</template>
