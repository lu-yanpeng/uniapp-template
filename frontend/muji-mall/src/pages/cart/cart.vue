<script setup lang="ts">
import SignIn from '@/components/goto-sign-in/index.vue'
import CartProduct from './components/cart-product.vue'
</script>

<template>
  <sign-in>
    <view class="bg-[#f2f2f2] h-full grid [grid-template-rows:1fr_50px]">
      <view class="overflow-y-auto">
        <cart-product v-if="true"></cart-product>

        <view v-else class="fixed top-[45%] left-1/2 [transform:translate(-50%,-50%)] flex items-center text-[#585858] text-sm">
          <view class="w-[21px] h-[1px] bg-[#585858]"></view>
          <view class="mx-2.5">暂无商品</view>
          <view class="w-[21px] h-[1px] bg-[#585858]"></view>
        </view>
      </view>
      <view class="bg-white h-[50px] [border-width:0.8px_0_0] border-[#ccc] border-solid px-4 flex items-center justify-between">
        <view class="text-[#7f0019]">
          <text class="text-xs text-[#1f1f21] mr-[4px]">合计</text>
          <text class="text-[10px]">¥</text><text class="text-[18px]">0</text>
        </view>
        <view
          class="rounded-full bg-black text-white text-[13px] px-[34px] py-[10px] flex justify-center"
          >结算</view
        >
      </view>
    </view>
  </sign-in>
</template>
