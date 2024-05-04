<script setup lang="ts">
import { ref } from 'vue'
import SetAddress from '@/components/set-address/index.vue'
import { useAddressStore } from '@/store/address'

const addressStore = useAddressStore()

const login = () => {
  uni.navigateTo({
    url: '/pages/login/login'
  })
}

const show = ref(false)
</script>

<template>
  <view class="flex justify-between items-center px-1.5">
    <text> 这是logo </text>

    <view class="flex items-center">
      <view class="flex items-baseline" @click="show = true">
        <image class="w-3.5 h-3.5 translate-y-0.5" src="@/pages/home/img/address.png" />
        <text class="text-sm">{{ addressStore.prefecture }}</text>

        <image class="w-3 h-1.5 ml-1" src="@/pages/home/img/down-arrow.png" />
      </view>

      <image src="./img/a.png" class="w-11 h-11" @click="login" />
      <image src="./img/b.png" class="w-11 h-11" @click="login" />
      <image src="./img/c.png" class="w-11 h-11" @click="login" />
      <image src="./img/d.png" class="w-11 h-11" @click="login" />
    </view>

    <set-address v-model="show" />
  </view>
</template>
