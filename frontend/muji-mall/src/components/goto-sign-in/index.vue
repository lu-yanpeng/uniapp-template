<script setup lang="ts">
import { useUserStore } from '@/store/user'
import { isAuth } from '@/hooks/auth'

const userStore = useUserStore()
isAuth()

const gotoLogin = () => {
  uni.navigateTo({
    url: '/pages/login/login'
  })
}
</script>

<template>
  <view>
    <view v-if="userStore.userInfo">
      <slot />
    </view>
    <view v-else>
      <view>请先<text class="text-cyan-300" @click="gotoLogin">登录</text></view>
    </view>
  </view>
</template>
