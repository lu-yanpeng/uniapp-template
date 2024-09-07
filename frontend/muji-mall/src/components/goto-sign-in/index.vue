<script setup lang="ts">
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

const gotoLogin = () => {
  uni.navigateTo({
    url: '/pages/login/login'
  })
}
</script>

<template>
  <view class="h-[calc(100vh-50px)]">
    <view v-if="userStore.userInfo" class="h-full">
      <slot />
    </view>
    <view v-else class="h-full flex items-center justify-center">
      <view class="text-sm">
        <view class="text-slate-500 text-center mb-1">请先登录</view>
        <view
          @click="gotoLogin"
          class="w-[120px] h-[36px] border border-[#ccc] border-solid rounded-full flex items-center justify-center"
        >立即登录</view
        >
      </view>
    </view>
  </view>
</template>
