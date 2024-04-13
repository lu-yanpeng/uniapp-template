<script setup lang="ts">
const login = () => {
  uni.navigateTo({
    url: '/pages/login/login'
  })
}
</script>

<template>
  <view class="flex justify-between items-center px-1.5">
    <text> 这是logo </text>

    <view class="flex items-center">
      <view class="flex items-baseline">
        <image class="w-3.5 h-3.5 translate-y-0.5" src="./img/address.png" />
        <text class="text-sm">上海</text>

        <image class="w-3 h-1.5 ml-1" src="./img/down-arrow.png" />
      </view>

      <image src="./img/a.png" class="w-11 h-11" @click="login" />
      <image src="./img/b.png" class="w-11 h-11" @click="login" />
      <image src="./img/c.png" class="w-11 h-11" @click="login" />
      <image src="./img/d.png" class="w-11 h-11" @click="login" />
    </view>
  </view>
</template>
