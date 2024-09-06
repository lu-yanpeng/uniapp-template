<script setup lang="ts">
import { useUserStore } from '@/store/user'
import SignIn from '@/components/goto-sign-in/index.vue'

const userStore = useUserStore()
</script>

<template>
  <view>
    <sign-in>
      <text>欢迎 {{ userStore.userInfo?.username }}</text>
      <view>
        <wd-button @click="userStore.logout">退出登录</wd-button>
      </view>
    </sign-in>
  </view>
</template>
