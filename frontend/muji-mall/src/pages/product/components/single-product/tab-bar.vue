<script setup lang="ts">
import { useUserStore } from '@/store/user'
import { useToast } from 'wot-design-uni'

const toast = useToast()
const userStore = useUserStore()

const emits = defineEmits<{
  addCart: []
}>()

const addCart = async () => {
  if (userStore.userInfo) {
    emits('addCart')
    return
  }
  toast.warning('请先登录')
  await uni.navigateTo({
    url: '/pages/login/login'
  })
}

const goCart = () => {
  uni.switchTab({url: '/pages/cart/cart'})
}
const goHome = () => {
  uni.switchTab({url: '/pages/home/home'})
}
</script>

<template>
  <view class="h-[3.15rem] bg-white [border-top:1px_solid_#e5e5e5] flex justify-between items-center px-3.5 gap-x-6">
    <view class="flex justify-between gap-3.5 flex-1">
      <view class="flex flex-col items-center" @click="goHome">
        <image class="w-5 aspect-[1/1] h-auto" src="../../img/home.png" />
        <text class="text-[0.625rem]">店铺</text>
      </view>
      <view class="flex flex-col items-center">
        <image class="w-5 aspect-[1/1] h-auto" src="../../img/service.png" />
        <text class="text-[0.625rem]">客服</text>
      </view>
      <view class="flex flex-col items-center" @click="goCart">
        <image class="w-5 aspect-[1/1] h-auto" src="../../img/car.png" />
        <text class="text-[0.625rem] text-nowrap">购物车</text>
      </view>
    </view>

      <view class="grid grid-cols-2 gap-x-2.5 text-sm text-center flex-none">
        <view class="bg-black text-white rounded-full py-1.5 px-3" @click="addCart">
          <text>加入购物车</text>
        </view>

        <view class="rounded-full [border:1px_solid_#000] py-1.5 px-3 ">
          <text>立即购买</text>
        </view>
      </view>
    </view>
</template>
